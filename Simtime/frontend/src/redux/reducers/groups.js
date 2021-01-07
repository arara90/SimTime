import {
  GET_GROUPS,
  ADD_GROUP,
  DELETE_GROUP,
  EDIT_GROUP,
  GET_GROUP,
  GET_GROUPMEMBERS,
  DELETE_GROUPMEMBER,
  DELETE_GROUPMEMBERS,
  ADD_TO_GROUP,
} from "../actions/types";

const initialState = {
  groups: [],
  selectedGroup: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
      };
    case GET_GROUP:
      return {
        ...state,
        selectedGroup: {
          group: state.groups.filter((group) => group.id == action.payload),
          members: null,
        },
      };
    case ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group.id != action.payload),
      };
    case EDIT_GROUP:
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id == action.payload.id ? action.payload : group
        ),
      };
    case GET_GROUPMEMBERS:
      return {
        ...state,
        selectedGroup: {
          group: state.groups.filter(
            (group) => group.id == action.payload.id
          )[0],
          members: action.payload.members,
        },
      };

    case DELETE_GROUPMEMBER:
      return {
        ...state,
        selectedGroup: {
          ...state.selectedGroup,
          members: state.selectedGroup.members.filter(
            (member) => member.RGmapId != action.payload
          ),
        },
      };

    case DELETE_GROUPMEMBERS:
      return {
        ...state,
        selectedGroup: {
          group: state.groups.filter(
            (group) => group.id == action.payload.id
          )[0],
          members: action.payload.members,
        },
      };

    case ADD_TO_GROUP:
      return {
        ...state,
        selectedGroup: {
          ...state.selectedGroup,
          members: action.payload.concat(state.selectedGroup.members),
        },
      };
    // case REGISTER_FAIL:
    // case AUTH_ERROR:
    // case LOGIN_FAIL:
    // case CREATE_FAIL:
    //   return {
    //     ...state,
    //     user: null,
    //     isAuthenticated: false,
    //     isLoading: false
    //   };

    default:
      return state;
  }
}
