import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    case REGISTER_SUCCESS:
      //set token
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      // localStorage.removeItem("token"); //removeCookie
      return initialState;

    default:
      return state;
  }
}
