import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_INVITATIONS,
  ADD_INVITATION,
  DELETE_INVITATION,
  GET_ERRORS,
  CREATE_MESSAGE
} from "./types";


// export const addInvitations = (invitations) => (dispatch) => {
//   console.log("addfriend", invitations);

//   // return axiosInstance
//   //   .post("/api/friend/create/", {
//   //     account: friend.account,
//   //     friend: friend.friend,
//   //   })
//   //   .then((res) => {
//   //     dispatch(createMessage({ addFriend: "Friend Added" }));
//   //     console.log("friends", res);
//   //     dispatch({ type: ADD_FRIEND, payload: res.data });
//   //     return res;
//   //   })
//   //   .catch((err) => {
//   //     dispatch(returnErrors(err.response, err.response.status));
//   //     return err;
//   //   });
// };


export const addInvitations = (invitations) => (dispatch) => {
  console.log("addInvitations", invitations);

  // return axiosInstance
  //   .post("/api/friend/create/", {
  //     account: friend.account,
  //     friend: friend.friend,
  //   })
  //   .then((res) => {
  //     dispatch(createMessage({ addFriend: "Friend Added" }));
  //     console.log("friends", res);
  //     dispatch({ type: ADD_FRIEND, payload: res.data });
  //     return res;
  //   })
  //   .catch((err) => {
  //     dispatch(returnErrors(err.response, err.response.status));
  //     return err;
  //   });
};