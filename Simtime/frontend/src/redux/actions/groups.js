import { createMessage, returnErrors } from "./messages";
import { axiosInstance, axiosFormInstance } from "./axiosApi";
// import axios from "axios";
// import { getCookie } from "./cookie";

import {
  ADD_GROUP,
  GET_GROUPS,
  GET_GROUP,
  EDIT_GROUP,
  GET_GROUPMEMBERS,
  DELETE_GROUP,
  DELETE_GROUPMEMBER,
  DELETE_GROUPMEMBERS,
  ADD_TO_GROUP,
} from "./types";

export const getGroups = () => async (dispatch) => {
  return axiosFormInstance
    .get("/api/groups/")
    .then((res) => {
      dispatch({
        type: GET_GROUPS,
        payload: res.data,
      });

      return res.status
    })
    .catch((err) =>{
      dispatch(returnErrors(err.response.data, err.response.status))
      return err.response.data
    }
    );
};



export const createGroup = (groupname) => (dispatch) => {
  return axiosInstance
    .post("/api/groups/create/", { groupname: groupname} )
    .then((res) => {
      dispatch({
        type: ADD_GROUP,
        payload: res.data,
      });
      dispatch(createMessage({ addGroup: "Group Added" }));
      return res.data;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      return err.response.data;
    });
};

export const deleteGroup = (id) => (dispatch) => {
  axiosInstance
    .delete(`/api/group/${id}`)
    .then((res) => {
      dispatch(createMessage({ deleteGroup: "Group Deleted" }));
      dispatch({
        type: DELETE_GROUP,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

export const getGroup = (id) => (dispatch) => {
  axiosInstance
    .get(`/api/group/${id}`)
    .then((res) => {
      dispatch({
        type: GET_GROUP,
        payload: res.data.id,
      });
      dispatch(createMessage({ getGroup: res.data.groupname }));
    })
    .catch((err) => console.log(err));
};

export const editGroup = (group) => (dispatch) => {
  axiosInstance
    .put(`/api/group/${group.id}/`, group)
    .then((res) => {
      dispatch(createMessage({ editGroup: "Group Edited" }));
      dispatch({
        type: EDIT_GROUP,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};


export const getMembers = (id) => (dispatch) => {
  return axiosInstance
    .get(`/api/groupmember/${id}/`)
    .then((res) => {
      dispatch({
        type: GET_GROUPMEMBERS,
        payload: { id: id, members: res.data },
      });

      return res
    })
    .catch((err) => {
      dispatch({
        type: GET_GROUPMEMBERS,
        payload: { id: id, members: [] },
      });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteMembers = (data) => (dispatch) => {
  var ids = data.join(" ");
  return axiosInstance
    .delete(`/api/groupmember/${ids}`)
    .then((res) => {
      dispatch(createMessage({ deleteMember: "Deleted" }));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteMember = (id) => (dispatch) => {
  return axiosInstance
    .delete(`/api/groupmember/${id}`)
    .then((res) => {
      dispatch(createMessage({ deleteMember: "Deleted" }));
      dispatch({ type: DELETE_GROUPMEMBER, payload: id });
    })
    .catch((err) => console.log(err));
};

