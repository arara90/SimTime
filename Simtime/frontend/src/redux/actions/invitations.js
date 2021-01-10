import { axiosInstance } from "./axiosApi";
import { createMessage, returnErrors } from "./messages";
import {getStrFullDate , getFullTime} from "./calendar"

import {
  GET_INVITATIONS,
  ADD_INVITATIONS,
  DELETE_INVITATION,
  GET_ERRORS,
  CREATE_MESSAGE,
  GET_EVENTS,
} from "./types";


function separateTime(data){
  var res = {...data}
  var event_at = new Date(Date.parse(res.event_time))
  res['event_date'] = getStrFullDate(event_at, "yyyy-mm-dd")
  res['event_time'] = getFullTime(event_at)
  return res
}

export const addInvitations = (event, friendIds) => async (dispatch) => {
  console.log('addInvitations',event, friendIds )
  var invitations = new Array(friendIds.length)

  friendIds.forEach( (friendId, index) => {
    invitations[index] = {event: event, guest:friendId}
  });

  return axiosInstance
  .post("/api/invitations/create", invitations)
  .then((response) => {
    console.log(response)
    return response
  })
  .catch((err) => {
    dispatch(returnErrors(err, err.response.status));
    console.log(err)
  });

};


export const getInvitations = (start, end) => (dispatch) => {
  console.log(start, end)
  axiosInstance
    .get(`/api/invitations/${start}/${end}`)
    .then((res={data:[]}) => {
      console.log('getInv Success', res.data)
      var transformed = {}
      res.data.map((item)=>{
        var separated = separateTime(item.event)
        var date = separated.event_date
        if( transformed[date]==undefined){
          transformed[date] = [{...item, 'event': separated}]
        }else{
          transformed[date] = [...transformed[date], {...item, 'event': separated}]
        }
      })
      console.log('inv transformed',transformed)
      dispatch({type: GET_INVITATIONS, payload: transformed,});
    })
    .catch((err) =>{
      dispatch(returnErrors(err.response, err.response.status))
      console.log(err)
    });
};