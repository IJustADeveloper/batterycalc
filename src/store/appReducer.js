import { combineReducers } from "redux";
import battSizeReducer from "./battSizeApp/battSizeReducer";
import battTimeReducer from "./battTimeApp/battTimeReducer";

const appReducer = combineReducers({
    battSize: battSizeReducer,
    battTime: battTimeReducer
})

export default appReducer