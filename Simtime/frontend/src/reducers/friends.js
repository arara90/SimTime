import {
    GET_FRIENDS,
    ADD_FRIEND,
    DELETE_FRIEND,
    EDIT_FRIEND,
    GET_FRIEND
  } from "../actions/types";
  
  const initialState = {
    relationships: [],
    selectedRelationship: {}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_FRIENDS:
        return {
          ...state,
          relationships: action.payload
        };
      case GET_FRIEND:
        return {
          ...state,
          selectedRelationship: state.relationships.filter(relationship => relationship.id == action.payload)
        };
      case ADD_FRIEND:
        return {
          ...state,
          relationships: [...state.relationships, action.payload]
        };
      case DELETE_FRIEND:
        return {
          ...state,
          relationships: state.relationships.filter(relationship => relationship.relationshipId != action.payload)
        }
      case EDIT_FRIEND:
        console.log(state.relationships)
        return {
          ...state,
          relationships: state.relationships.map(relationship =>
            relationship.relationshipId == action.payload.relationshipId ? action.payload : relationship
          )
        };
      default:
        return state;
    }
  }
  