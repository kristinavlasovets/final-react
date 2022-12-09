import {createAsyncThunk} from '@reduxjs/toolkit';
import AuthService from '../../../../services/AuthService';

import {registrationInput} from '../../../../services/AuthService';

export const loginThunk = createAsyncThunk(
	'auth/login',
	async (data: registrationInput, thunkAPI) => {
		const response = await AuthService.login(data);
		localStorage.setItem('token', response.data.accessToken);
		return response.data.user;
	}
);
