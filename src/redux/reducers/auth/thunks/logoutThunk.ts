import {createAsyncThunk} from '@reduxjs/toolkit';
import AuthService from '../../../../services/AuthService';

export const logoutThunk = createAsyncThunk(
	'auth/logout',
	async (_, thunkAPI) => {
		const response = await AuthService.logout();
		localStorage.removeItem('token');
	}
);
