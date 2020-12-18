import { axiosInstance } from "./axiosApi";
import { createMessage, returnErrors } from "./messages";

import {
  GET_INVITATIONS,
  ADD_INVITATIONS,
  DELETE_INVITATION,
  GET_ERRORS,
  CREATE_MESSAGE
} from "./types";


function separateTime(data){
  var res = {...data}
  var event_at = new Date(Date.parse(res.event_time))
  res['event_date'] = getStrFullDate(event_at, "yyyy-mm-dd")
  res['event_time'] = getFullTime(event_at)
  return res
}

export const addInvitations = (event, relationshipIds) => async (dispatch) => {
  var invitations = new Array(relationshipIds.length)

  relationshipIds.forEach( (relationshipId, index) => {
    invitations[index] = {event: event, relationship:relationshipId  }
  });

  console.log("addInvitations action", invitations);
  
  return axiosInstance
  .post("/api/invitations/create", invitations)
  .then((response) => {
    console.log(response)
    // return invitations.id
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
      console.log('getInv Success', res)
      //var transformed = {}
      // res.data.map((d)=>{
      //   var separated = separateTime(d)
      //   var date = separated.event_date
      //   if( transformed[date]==undefined){
      //     transformed[date] = [separated]
      //   }else{
      //     transformed[date] = [...transformed[date], separated]
      //   }
      // })
      // dispatch({type: GET_INVITATIONS, payload: transformed,});
    })
    .catch((err) =>{
      dispatch(returnErrors(err.response.data, err.response.status))
      console.log(err)
    });
};