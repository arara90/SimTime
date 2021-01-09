import {
    GET_FRIENDS,
    ADD_FRIEND,
    DELETE_FRIEND,
    EDIT_FRIEND,
    GET_FRIEND
  } from "../actions/types";
  
  const initialState = {
    friendships: [],
    selectedFriendship: {}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_FRIENDS:
        return {
          ...state,
          friendships: action.payload
        };
      case GET_FRIEND:
        return {
          ...state,
          selectedFriendship: state.friendships.filter(friendship => friendship.id == action.payload)
        };
      case ADD_FRIEND:
        return {
          ...state,
          friendships: [...state.friendships, action.payload]
        };
      case DELETE_FRIEND:
        return {
          ...state,
          friendships: state.friendships.filter(friendship => friendship.id != action.payload)
        }
      case EDIT_FRIEND:
        return {
          ...state,
          friendships: state.friendships.map(friendship =>
            friendship.id == action.payload.id ? action.payload : friendship
          )
        };
      default:
        return state;
    }
  }
  