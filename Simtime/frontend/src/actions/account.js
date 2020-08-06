import { createMessage, returnErrors } from "./messages";
import { axiosInstance, axiosFormInstance } from "./axiosApi";
// import { } from "./types";


  // 친구 검색
  export const searchUsers = (field, keyword) => (dispatch) =>{

    if(!field || !keyword){
      // dispatch(createMessage({ emptyField : `Field is required` }));
      return [];
    }else{
      return axiosInstance
        .get(`/api/account/${field}/${keyword}`)
        .then((res) => {
          console.log("res.data", res.data)
          return res.data
        })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        return err
      });
    }
  
  
  }