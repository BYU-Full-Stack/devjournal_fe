import { createStore, combineReducers } from 'redux'
import userReducer from './reducers/user'
import alertsReducer from './reducers/alert'

const rootReducer = combineReducers({
    userReducer,
    alertsReducer
});

const store = createStore(rootReducer);

export default store;

export type RootState = ReturnType<typeof rootReducer>