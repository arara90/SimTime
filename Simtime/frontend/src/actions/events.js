import { createMessage, returnErrors } from "./messages";
import { axiosInstance, axiosFormInstance } from "./axiosApi";
import axios from "axios";
import { getCookie } from "./cookie";

import {
  GET_EVENTS,
  GET_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  GET_ERRORS,
  CREATE_MESSAGE,
} from "./types";

function transformEvents(data){
  var transformed = {}
  data.map((d)=>{
    var date = d.event_time.substr(0, 10)
    if( transformed[date]==undefined){
      transformed[date] = [d]
    }else{
      transformed[date] = [...transformed[date], d]
    }
  })
  return transformed
}



export const getEvents = (start, end) => (dispatch) => {
  console.log(start, end)
  axiosFormInstance
    .get(`/api/events/${start}/${end}`)
    .then((res={data:[]}) => {
      var transformed = {}
      res.data.map((d)=>{
        var date = d.event_time.substr(0, 10)
        if( transformed[date]==undefined){
          transformed[date] = [d]
        }else{
          transformed[date] = [...transformed[date], d]
        }
      })

      dispatch({
        type: GET_EVENTS,
        payload: transformed,
      });
      // console.log(res)
    })
    .catch((err) =>{
      // dispatch(returnErrors(err.response.data, err.response.status))
      console.log(err)
    });
    
};

export const getEvent = (id) => (dispatch) => {
  dispatch({
    type: GET_EVENT,
    payload: id,
  });
};

export const addEvent = (event, img) => (dispatch) => {

  if(img) {
  const data = new FormData();

  data.append("photo", img);
  data.append("host", event.host);
  data.append("event_name", event.event_name);
  data.append("event_time", event.event_time);
  data.append("status", event.status);
  data.append("event_place", JSON.stringify(event.event_place) );
  data.append("message", event.message);

  axiosFormInstance
    .post("/api/events/create", data)
    .then((res) => {
      var transformed = transformEvents([res.data])
      dispatch({
        type: ADD_EVENT,
        payload: res,
      });

      dispatch(createMessage({ addEvent: "Event Added" }));
    })
    // .catch((err) => {
    //   dispatch(returnErrors(err.response.data, err.response.status));
    // });
  }else{
  axiosInstance
    .post("/api/events/create", event)
    .then((res) => {
      console.log(res)
      var transformed = transformEvents([res.data])
      dispatch({
        type: ADD_EVENT,
        payload: res.data,
      });

      dispatch(createMessage({ addEvent: "Event Added" }));
    })
    // .catch((err) => {
    //   dispatch(returnErrors(err.response.data, err.response.status));
    // });
  }
  
};

export const deleteEvent = (id) => (dispatch) => {
  axiosInstance
    .delete(`/api/events/${id}`)
    .then((res) => {
      dispatch(createMessage({ deleteEvent: "Event Deleted" }));
      dispatch({
        type: DELETE_EVENT,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

export const editEvent = (event) => (dispatch) => {
  axiosFormInstance
    .put(`/api/events/${event.id}`, event)
    .then((res) => {
      dispatch({
        type: EDIT_EVENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};


