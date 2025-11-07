import {createStore, applyMiddleware} from "redux"
import appReducer from "./appReducer"
import { thunk } from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

const appStore = createStore(appReducer, composeWithDevTools(applyMiddleware(thunk)))

export default appStore