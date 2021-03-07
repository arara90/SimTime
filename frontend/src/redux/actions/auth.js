import axios from "axios";
import { axiosInstance, axiosFormInstance } from "./axiosApi"
import { returnErrors, createMessage } from "./messages";
import { setCookie, getCookie, deleteCookie } from "./cookie"
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL
} from "./types";


const makeFormData=(profile)=>{
  console.log('makeFormData', profile)
  const formData = new FormData();
  // formData.append("username", profile.username);
  // formData.append("email", profile.email);
  // formData.append("password", profile.password);
  // formData.append("profile_image", profile.profile_image);


  if(profile.username) formData.append("username", profile.username);
  if(profile.email) formData.append("email", profile.email);
  if(profile.password) formData.append("password", profile.password);
  if(profile.profile_image) formData.append("profile_image", profile.profile_image);

  return formData
}


// CHECK THE TOKEN & LOAD USER
export const loadUser = () => (dispatch) => {
  // User Loading
  dispatch({ type: USER_LOADING });
  axiosInstance
    .get("/api/auth/account/")
    .then(res => {
      console.log('api/auth/account', res.data)
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
        console.log(res)
        //쿠키 저장
        setCookie('access', res.data.access, 10 );
        setCookie('refresh', res.data.refresh, 10 );
        //instance header 설정
        axiosInstance.defaults.headers['Authorization'] = "JWT " + getCookie('access');
        axiosFormInstance.defaults.headers['Authorization'] = "JWT " + getCookie('access');
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
  var deleteCookie = (name) => document.cookie = name+'=; Max-Age=-99999999;';  
  deleteCookie('access');
  deleteCookie('refresh');

  dispatch({type: LOGOUT});
  dispatch(createMessage({ logout : `LOGOUT` }));
};

// REGISTER
export const register = ( profile ) => async dispatch => {
  if(profile.profile_image){
    var body = makeFormData(profile)
  }else{
    var body = profile
  }
  const axiosInstance = axios.create({
        timeout: 5000,
        headers: {
          baseURL: "/",
          "Content-Type": (profile.profile_image? "multipart/form-data": "application/json"),
        },
      });

  //요청보내기
  return axiosInstance
    .post("/api/auth/register",  body)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(createMessage({ register : `Welcome!` }))
      return res.status
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// UPDATE
export const editProfile = ( profile ) => async dispatch => {
  if(profile.profile_image){
    var body = makeFormData(profile)
  }else{
    var body = profile
  }

  const axiosInstance = axios.create({
        timeout: 5000,
        headers: {
          baseURL: "/",
          "Content-Type": (profile.profile_image? "multipart/form-data": "application/json"),
          'Authorization': "JWT " + getCookie('access')
        },
      });

  //요청보내기
  return axiosInstance
    .put(`/api/auth/${profile.id}`,  body)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data
      });
      dispatch(createMessage({ editAccount : `수정완료!` }))
      return res.status
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: UPDATE_FAIL
      });
    });
}






// // REGISTER
// export const editProfile = ({ username, email, password, profile_image }) => dispatch => {
//   const config = {
//     // Haders
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
//   // Request Body
//   const body = JSON.stringify({ username, email, password, profile_image });

//   axios
//     .post("/api/auth/register", body, config)
//     .then(res => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: REGISTER_FAIL
//       });
//     });
// };