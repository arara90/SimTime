import axios from "axios";
import { axiosInstance } from "./axiosApi"
import { returnErrors } from "./messages";
import { setCookie, getCookie } from "./cookie"
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

// CHECK THE TOKEN & LOAD USER
export const loadUser = () => (dispatch) => {
  // User Loading
  dispatch({ type: USER_LOADING });
  axiosInstance
    .get("api/token/verify/")
    .then(res => {
      console.log(res.data)
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// LOGIN USER
export const login = (username, password) => dispatch => {
    // Request Body
    const body = JSON.stringify({ username, password });
    axiosInstance
      .post('api/token/obtain/', body)
      .then(res => {
        //쿠키 저장
        setCookie('access', res.data.access, 10 );
        setCookie('refresh', res.data.refresh, 10 );
        //instance header 설정
        axiosInstance.defaults.headers['Authorization'] = "JWT " + getCookie('access');
        //dispatch
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.user
        });
      })
      .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
              type: LOGIN_FAIL
            });
          });
};


// Logout
export const logout = () => (dispatch) => {
  axiosInstance
    .post("/api/auth/logout", null)
    .then(res => {
      dispatch({
        type: LOGOUT
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// REGISTER
export const register = ({ username, email, password }) => dispatch => {
  const config = {
    // Haders
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request Body
  const body = JSON.stringify({ username, email, password });

  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};