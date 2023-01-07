import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Action} from '@remix-run/router';
import {IUser} from '../../../models/IUser';
import {loginThunk} from './thunks/loginThunk';
import {logoutThunk} from './thunks/logoutThunk';
import {registrationThunk} from './thunks/registrationThunk';

interface AuthState {
	mode: 'light' | 'dark';
	user: IUser;
	isAuth: boolean;
	isLoading: boolean;
	isAdmin: boolean;
	error: string;
}

const initialState: AuthState = {
	mode: 'light',
	user: {} as IUser,
	isAuth: false,
	isLoading: false,
	isAdmin: false,
	error: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === 'light' ? 'dark' : 'light';
		},
		setAdmin: (state) => {
			state.isAdmin = state.user.role === 'admin' ? true : false;
		},
		like: (state, action: PayloadAction<string>) => {
			if (state.user.likedReviews.includes(action.payload)) {
				state.user.likedReviews.splice(
					state.user.likedReviews.findIndex((id) => id === action.payload),
					1
				);
			} else {
				state.user.likedReviews.push(action.payload);
			}
		},
	},
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
		builder.addCase(
			loginThunk.fulfilled,
			(state, action: PayloadAction<IUser>) => {
				state.isAuth = true;
				state.error = '';
				state.isLoading = false;
				state.user = action.payload;
			}
		);
		builder.addCase(loginThunk.pending, (state, action) => {
			state.isAuth = false;
			state.error = '';
			state.isLoading = true;
			state.user = {} as IUser;
		});
		builder.addCase(loginThunk.rejected, (state, action) => {
			state.isAuth = false;
			state.error = 'Login Error from Thunk';
			state.isLoading = false;
			state.user = {} as IUser;
		});
		builder.addCase(logoutThunk.fulfilled, (state) => {
			state.isAuth = false;
			state.error = '';
			state.isLoading = false;
			state.user = {} as IUser;
		});
		builder.addCase(logoutThunk.pending, (state) => {
			state.isAuth = false;
			state.error = '';
			state.isLoading = true;
			state.user = {} as IUser;
		});
		builder.addCase(logoutThunk.rejected, (state) => {
			state.isAuth = false;
			state.error = 'Logout Error from Thunk';
			state.isLoading = false;
			state.user = {} as IUser;
		});
	},
});

export const {like, setMode, setAdmin} = authSlice.actions;

export default authSlice.reducer;
