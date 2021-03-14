import { createMessage, returnErrors } from "./messages";
import { axiosInstance, axiosFormInstance } from "./axiosApi";
import {getStrFullDate , getFullTime} from "./calendar"
import {startLoading, finishLoading } from "./loading"
import {addInvitations} from "./invitations"

import {
  //evnet
  GET_EVENTS,
  GET_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  //invitation
  ADD_INVITATION,
  DELETE_INVITATION,
  SELECT_INVITATION,
  //etc
  GET_ERRORS,
  CREATE_MESSAGE,
  START_LOADING,
  FINISH_LOADING,
} from "./types";
import { object } from "prop-types";


function separateEventTime(data){
  var res = {...data}
  var event_at = new Date(Date.parse(res.event_time))
  const meridiem = getFullTime(event_at).split(":")[0]<12?"AM":"PM"
  res['event_date'] = getStrFullDate(event_at, "yyyy-mm-dd")
  res['event_time'] = getFullTime(event_at)  + ' ' + meridiem;
  return res
}

function convertEventTimeToISO(event){
  const timeISO = new Date(event.event_date + " " + event.event_time.split(" ")[0]).toISOString()
  event['event_time'] = timeISO
  delete event['event_date']
}

export const getEvents = (start, end) => (dispatch) => {
  axiosFormInstance
    .get(`/api/events/${start}/${end}`)
    .then((res={data:[]}) => {
      var transformed = {}
      res.data.map((d)=>{
        var separated = separateEventTime(d)
        var date = separated.event_date
        if( transformed[date]==undefined){
          transformed[date] = [separated]
        }else{
          transformed[date] = [...transformed[date], separated]
        }
      })
      dispatch({type: GET_EVENTS,payload: transformed,});
    })
    .catch((err) =>{
      dispatch(returnErrors(err.response.data, err.response.status))
      console.log(err)
    });
};

export const getEvent = (id) => (dispatch) => {
  dispatch({type: GET_EVENT,payload: id});
};

export const addEvent =  (event, img) => async (dispatch) =>{
  const SUCCEESS = 'ADD_EVENT_SUCCESS'
  const FAILURE = 'ADD_EVENT_FAILURE'
  //date+time
  convertEventTimeToISO(event)
  console.log(event.event_time)
  try{
    if(img) {
      const formData = new FormData();
      formData.append("photo", img);
      formData.append("color", event.color);
      formData.append("host", event.host);
      formData.append("event_name", event.event_name);
      formData.append("event_time", event.event_time);
      formData.append("event_place", JSON.stringify(event.event_place) );
      formData.append("message", event.message);
  
      return axiosFormInstance
        .post("/api/events/create", formData)
        .then((response) => {
          //본인 to 본인 invitation 보내기
          return dispatch(addInvitations(response.data.id, [response.data.host.id]))
        })
        .then((res)=>{
          dispatch(createMessage({ addEvent: "Event Added" }));
          return res.event.id
        })
        .catch((err) => {
          console.log(err)
        });
    }else{
      return axiosInstance
        .post("/api/events/create", event)
        .then((response) => {
          //본인 to 본인 invitation 보내기
          var resEvent = response.data
          return dispatch(addInvitations(resEvent.id, [resEvent.host.id]))
        })
        .then((res)=>{
          // console.log('eventres', res)
          dispatch(createMessage({ addEvent: "이벤트를 추가했습니다." }));
          return res.event.id
        })
        .catch((err) => {
          dispatch(returnErrors(err, err.response.status));
          console.log(err)
        });
    }
  }catch(e){
    dispatch({type:FAILURE,payload: e,error: true});
  }
}

export const deleteEvent = (id, event_date) => (dispatch) => {
  axiosInstance
    .delete(`/api/events/${id}`)
    .then(() => {
      dispatch(createMessage({ deleteEvent: "이벤트를 삭제했습니다." }));
      // dispatch({type: DELETE_EVENT, payload:{id:id, event_date:event_date}});
      dispatch({type: DELETE_INVITATION, payload:{id:id, event_date:event_date}});

    })
    .catch((err) => {
      // dispatch(returnErrors(err, err.response.status));
      console.log(err)
    });
};

export const editEvent = (new_event, invitation) => async (dispatch) =>{
  const FAILURE = 'EDIT_EVENT_FAILURE'
  var axios = axiosInstance
  var requestData = new_event

  //date, time 합치고 ISO타입으로 변환  
  convertEventTimeToISO(new_event)

  try{
    //img 파일 있으면 formData로 전송
    if(new_event.hasOwnProperty('photo')) {
      axios = axiosFormInstance //폼 형식 axios Instance로 변경
      requestData = new FormData();
      for (const [key, value] of Object.entries(new_event)) {
        if(typeof key=='object') value = JSON.stringify(value)
        else requestData.append(key, value);
      }
    }

    return axios.put(`/api/events/${new_event.id}`, requestData)
    .then((res)=>{
      //1. invitation삭제
      dispatch({type: DELETE_INVITATION, payload:{id:invitation.event.id, event_date:invitation.event.event_date}});
      //2. date, time 분리한 event/ status 전달
      return {data: separateEventTime(res.data), status: res.status }
    })
    .then((res)=>{
      //3. 새로운 invitaion추가
      var new_invitation = {...invitation, event: res.data}
      dispatch({type: ADD_INVITATION, payload: new_invitation});

      //4. selected invitation에 반영
      dispatch({
        type: SELECT_INVITATION,
        payload: new_invitation,
      });

      //4. 결과 return
      console.log(res.status)
      return res.status
    })
    .catch((err) => {
      dispatch(returnErrors(err, err.response.status));
    });
  }catch(e){
    dispatch({type:FAILURE,payload: e,error: true});
  }
}

