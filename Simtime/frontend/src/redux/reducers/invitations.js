import { isCompositeComponent } from "react-dom/test-utils";
import {
  GET_INVITATIONS,
  ADD_INVITATION,
  TOGGLE_INVITATION,
  DELETE_INVITATION,
} from "../actions/types";

const initialState = {
  datas: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INVITATIONS:
      return {
        ...state,
        datas: {...state.datas, ...action.payload}
      };

    case ADD_INVITATION:
      var date = action.payload['event']['event_date']
      var newData = []
      if(state.datas[date]){
        newData = state.datas[date].map((value) => {return value});
      }

      newData.push(action.payload)

      return {
        ...state,
        datas: {...state.datas, [date]:newData}
      };

    case TOGGLE_INVITATION:
      var date = action.payload['event']['event_date']
      var newData = state.datas[date].map(invitation => 
        invitation.id == action.payload['id'] ? action.payload : invitation)
      return {
        ...state,
        datas: {...state.datas, [date]: newData}
      };

    case DELETE_INVITATION:
      return {
        ...state,
        datas: state.datas.filter(
          invitation => invitation.id != action.payload
        )
      };
    default:
      return state;
  }
}
