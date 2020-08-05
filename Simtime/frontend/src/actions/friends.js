import { createMessage, returnErrors } from "./messages";
import { axiosInstance, axiosFormInstance } from "./axiosApi";

import {
  ADD_FRIEND,
  GET_FRIENDS,
  GET_FRIEND,
  EDIT_FRIEND,
  DELETE_FRIEND,
} from "./types";

export const addfriend = (friend) => (dispatch) => {
  console.log("addfriend", friend);

  return axiosInstance
    .post("/api/friend/create/", {
      account: friend.account,
      friend: friend.friend,
    })
    .then((res) => {
      dispatch(createMessage({ addFriend: "Friend Added" }));
      console.log("friends", res);
      dispatch({ type: ADD_FRIEND, payload: res.data });
      return res;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response, err.response.status));
      return err;
    });
};

export const deleteFriend = (id) => (dispatch) => {
  console.log("deleteFriend", id);
  return axiosInstance
    .delete(`/api/friend/${id}`)
    .then((res) => {
      dispatch(createMessage({ deleteFriend: "Friend Deleted" }));
      console.log("deleted", res);
      dispatch({ type: DELETE_FRIEND, payload: id });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response, err.response.status));
      return err;
    });
};

export const editFriend = (data) => (dispatch) => {
  // subscribe:true
  // dispatch:true
  console.log("editFriend", data);
  return axiosInstance
    .put(`/api/friend/${data.id}`, data)
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: EDIT_FRIEND,
        payload: res.data,
      });
      dispatch(createMessage({ editFriend: "Edited" }));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response, err.response.status));
      return err;
    });
};

export const getFriends = () => (dispatch) => {
  console.log("getFriends");
  return axiosInstance
    .get("/api/friends/")
    .then((res) => {
      console.log("friends", res);
      dispatch({
        type: GET_FRIENDS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};


// 친구가 속한 그룹 관리
export const addToGroup = (datas) => (dispatch) => {
  //{relationship:0, group:0}
  console.log("addToGroup", datas);
  return axiosInstance
    .post("/api/friend/add-to-group/", datas)
    .then((res) => {
      dispatch(createMessage({ addToGroup: "Added to Group" }));
      return res;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return err;
    });
};