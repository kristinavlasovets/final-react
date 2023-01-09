import {createAsyncThunk} from '@reduxjs/toolkit';
import AuthService from '../../../../services/AuthService';

export const loginViaSocialThunk = createAsyncThunk(
	'auth/login-via-social',
	async (_, thunkAPI) => {
		const response = await AuthService.loginViaSocial();
		localStorage.setItem('token', response.data.accessToken);
		return response.data.user;
	}
);
