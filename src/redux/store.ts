import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/auth/AuthSlice';

const rootReducer = combineReducers({
	authReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
