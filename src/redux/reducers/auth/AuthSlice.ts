import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../../models/IUser';
import {registrationThunk} from './thunks/registrationThunk';

interface AuthState {
	user: IUser;
	isAuth: boolean;
	isLoading: boolean;
	error: string;
}

const initialState: AuthState = {
	user: {} as IUser,
	isAuth: false,
	isLoading: false,
	error: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			registrationThunk.fulfilled,
			(state, action: PayloadAction<IUser>) => {
				state.isAuth = true;
				state.error = '';
				state.isLoading = false;
				state.user = action.payload;
			}
		);
		builder.addCase(registrationThunk.pending, (state, action) => {
			state.isAuth = false;
			state.error = '';
			state.isLoading = true;
			state.user = {} as IUser;
		});
		builder.addCase(registrationThunk.rejected, (state, action) => {
			state.isAuth = false;
			state.error = 'Registration Error from Thunk';
			state.isLoading = false;
			state.user = {} as IUser;
		});
	},
});

export default authSlice.reducer;
