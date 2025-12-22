import { combineReducers } from "redux";
import battSizeReducer from "./battSizeApp/battSizeReducer";
import battTimeReducer from "./battTimeApp/battTimeReducer";
import sharedReducer from "./shared/reducer";

const appReducer = combineReducers({
    battSize: battSizeReducer,
    battTime: battTimeReducer,
    shared: sharedReducer
})

export default appReducer