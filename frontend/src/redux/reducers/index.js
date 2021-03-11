import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import account from "./account";
import friends from "./friends";
import groups from "./groups";
import invitations from "./invitations";
import events from "./events";
import loading from "./loading"

// import { reducer as modal } from "react-redux-modal-flex";

var appReducer = combineReducers({
  errors,
  messages,
  auth,
  account,
  friends,
  groups,
  events,
  invitations,
  loading
});


var rootReducer = (state, action)=>{
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
  
}


// export default combineReducers({
//   errors,
//   messages,
//   auth,
//   account,
//   friends,
//   groups,
//   events,
//   invitations,
//   loading
// });


export default rootReducer