import { createMessage, returnErrors } from "./messages";
import { axiosInstance, axiosFormInstance } from "./axiosApi";

import {
  ADD_FRIEND,
  GET_FRIENDS,
  GET_FRIEND,
  EDIT_FRIEND,
  DELETE_FRIEND,
  ADD_TO_GROUP,
} from "./types";

export const addfriend = (friend) => async (dispatch) => {

  return axiosInstance
    .post("/api/friend/create/", {
      account: friend.account,
      friend: friend.friend,
    })
    .then((res) => {
      dispatch(createMessage({ addFriend: "Friend Added" }));
      dispatch({ type: ADD_FRIEND, payload: res.data });
      return res;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response, err.response.status));
      return err;
    });
};

export const deleteFriend = (id) => async (dispatch) => {
  return axiosInstance
    .delete(`/api/friend/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_FRIEND, payload: id });
      dispatch(createMessage({ deleteFriend: "Friend Deleted" }));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response, err.response.status));
      return err;
    });
};

export const editFriend = (data) => async (dispatch) => {
  // subscribe:true
  // dispatch:true
  return axiosInstance
    .put(`/api/friend/${data.id}`, data)
    .then((res) => {
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

export const getFriends = () => async (dispatch) => {
  return axiosInstance
    .get("/api/friends/")
    .then((res) => {
      dispatch({
        type: GET_FRIENDS,
        payload: res.data,
      });
      return res.status
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};



// 친구가 속한 그룹 관리
export const addToGroup = (datas) => async (dispatch) => {
  //{relationship:0, group:0}
  return axiosInstance
    .post("/api/friend/add-to-group/", datas)
    .then((res) => {
      dispatch({ type: ADD_TO_GROUP, payload: res.data });
      dispatch(createMessage({ addToGroup: "Added to Group" }));
      console.log("addToGroup", res);
      return res
    })
    .catch((err) => {
      console.log(err);
      // dispatch(returnErrors(err.response.data, err.response.status));
    });
};
