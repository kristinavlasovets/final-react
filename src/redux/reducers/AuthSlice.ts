import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../models/IUser';

interface AuthState {
	users: IUser[];
	isLoading: boolean;
	error: string;
}

const initialState: AuthState = {
	users: [],
	isLoading: false,
	error: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
});

export default authSlice.reducer;
