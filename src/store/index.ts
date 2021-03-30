import { createStore, combineReducers } from 'redux'
import userReducer from './reducers/user'

const rootReducer = combineReducers({
    userReducer
});

const store = createStore(rootReducer);

export default store;

export type RootState = ReturnType<typeof rootReducer>