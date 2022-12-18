import React, {FC} from 'react';

import {SignForm} from '../components/SignForm/SignForm';
import {registrationInput} from '../services/AuthService';
import {loginThunk} from '../redux/reducers/auth/thunks/loginThunk';

import {Box} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {Navigate} from 'react-router-dom';
import {AppRoutes} from '../components/AppRouter/interface';

export const SignInPage: FC = () => {
	const dispatch = useAppDispatch();
	const {isAuth} = useAppSelector((state) => state.authReducer);
	const signin = (data: registrationInput) => {
		const {email, password} = data;
		dispatch(loginThunk({email, password}));
	};

	if (isAuth) return <Navigate to={AppRoutes.HOME} />;

	return (
		<Box sx={{mt: '20vh', w: 700, display: 'flex', justifyContent: 'center'}}>
			<SignForm signFormSubmit={signin} />
		</Box>
	);
};
