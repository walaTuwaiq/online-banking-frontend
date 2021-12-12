import { createStore, combineReducers } from "redux";

import token from "./token";

const reducers = combineReducers({ token });
const store = createStore(reducers);

export default store;
