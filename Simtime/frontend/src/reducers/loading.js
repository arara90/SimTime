import {
  START_LOADING,
  FINISH_LOADING
} from "../actions/types"

const initialState = {};

export default function(state=initialState, action){
  switch(action.type){
    case START_LOADING:
      return {...state, [action.payload]: true}
    case FINISH_LOADING :
      return {...state, [action.payload]: false}
    default:
      return initialState
    }
  }
