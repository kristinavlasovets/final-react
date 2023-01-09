import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../../models/IUser';
import {loginThunk} from './thunks/loginThunk';
import {loginViaSocialThunk} from './thunks/loginViaSocial';
import {logoutThunk} from './thunks/logoutThunk';
import {registrationThunk} from './thunks/registrationThunk';

interface AuthState {
	mode: 'light' | 'dark';
	user: IUser;
	isAuth: boolean;
	isLoading: boolean;
	isAdmin: boolean;
	error: string;
	viaSocial: boolean;
}

const initialState: AuthState = {
	mode: 'light',
	user: {} as IUser,
	isAuth: false,
	isLoading: false,
	isAdmin: false,
	error: '',
	viaSocial: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		viaSocial: (state, action: PayloadAction<boolean>) => {
			state.viaSocial = action.payload;
		},
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
				state.viaSocial = false;
			}
		);
		builder.addCase(registrationThunk.pending, (state, action) => {
			state.isAuth = false;
			state.error = '';
			state.isLoading = true;
			state.user = {} as IUser;
			state.viaSocial = false;
		});
		builder.addCase(registrationThunk.rejected, (state, action) => {
			state.isAuth = false;
			state.error = 'Registration Error from Thunk';
			state.isLoading = false;
			state.user = {} as IUser;
			state.viaSocial = false;
		});
		builder.addCase(
			loginThunk.fulfilled,
			(state, action: PayloadAction<IUser>) => {
				state.isAuth = true;
				state.error = '';
				state.isLoading = false;
				state.user = action.payload;
				state.viaSocial = false;
			}
		);
		builder.addCase(loginThunk.pending, (state, action) => {
			state.isAuth = false;
			state.error = '';
			state.isLoading = true;
			state.user = {} as IUser;
			state.viaSocial = false;
		});
		builder.addCase(loginThunk.rejected, (state, action) => {
			state.isAuth = false;
			state.error = 'Login Error from Thunk';
			state.isLoading = false;
			state.user = {} as IUser;
			state.viaSocial = false;
		});

		builder.addCase(
			loginViaSocialThunk.fulfilled,
			(state, action: PayloadAction<IUser>) => {
				state.isAuth = true;
				state.error = '';
				state.isLoading = false;
				state.user = action.payload;
				state.viaSocial = true;
			}
		);
		builder.addCase(loginViaSocialThunk.pending, (state, action) => {
			state.isAuth = false;
			state.error = '';
			state.isLoading = true;
			state.user = {} as IUser;
			state.viaSocial = false;
		});
		builder.addCase(loginViaSocialThunk.rejected, (state, action) => {
			state.isAuth = false;
			state.error = 'Login via social network error from Thunk';
			state.isLoading = false;
			state.user = {} as IUser;
			state.viaSocial = false;
		});

		builder.addCase(logoutThunk.fulfilled, (state) => {
			state.isAuth = false;
			state.error = '';
			state.isLoading = false;
			state.user = {} as IUser;
			state.viaSocial = false;
		});
		builder.addCase(logoutThunk.pending, (state) => {
			state.isAuth = false;
			state.error = '';
			state.isLoading = true;
			state.user = {} as IUser;
			state.viaSocial = false;
		});
		builder.addCase(logoutThunk.rejected, (state) => {
			state.isAuth = false;
			state.error = 'Logout Error from Thunk';
			state.isLoading = false;
			state.user = {} as IUser;
			state.viaSocial = false;
		});
	},
});

export const {like, setMode, setAdmin, viaSocial} = authSlice.actions;

export default authSlice.reducer;
