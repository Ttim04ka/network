import { applyMiddleware, combineReducers, createStore,compose } from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";
import  thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
let reducers=combineReducers({
    profileReducer,
    dialogsReducer,
    usersReducer,
    authReducer,
    appReducer,
    chatReducer,
    form:formReducer
});
type ReducersType=typeof reducers;
export type AppState=ReturnType<ReducersType>
let state:AppState

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)))


export type PropertiesTypes<T> = T extends {[key:string] : infer U} ? U : never

export type InfernActionsType<T extends {[key:string]  : (...arg:any[])=>any}>=ReturnType<PropertiesTypes<T>>
//@ts-ignore
window.store=store;

export default store;