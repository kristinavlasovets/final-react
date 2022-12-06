import {createAsyncThunk} from '@reduxjs/toolkit';
import AuthService from '../../../services/AuthService';

import {registrationInput} from '../../../services/AuthService';

export const registrationThunk = createAsyncThunk(
	'auth/registration',
	async (data: registrationInput, thunkAPI) => {
		const response = await AuthService.registration(data);
		localStorage.setItem('token', response.data.accessToken);
		return response.data.user;
	}
);
