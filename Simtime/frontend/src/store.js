import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleWare = [thunk];

// const logAction = store =>{
//   return next =>{
//     return action =>{
//       const result = next(action);
//       console.log(`caught in the middleware ${JOSN.stringfy(result)}`)
//       return result
//     }
//   }
// }

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
