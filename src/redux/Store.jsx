import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";


const rootReducers = combineReducers({
 auth:authReducer
})

export const Store = legacy_createStore(rootReducers,applyMiddleware(thunk))