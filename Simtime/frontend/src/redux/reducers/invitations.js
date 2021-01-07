import {
  GET_INVITATIONS,
  ADD_INVITATION,
  DELETE_INVITATION
} from "../actions/types";

const initialState = {
  datas: [],
  somthing: "text"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INVITATIONS:
      return {
        ...state,
        datas: action.payload
      };
    case ADD_INVITATION:
      return {
        ...state,
        datas: [...state.datas, action.payload]
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
