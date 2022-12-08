import React, {FC} from 'react';

import {SignForm} from '../components/SignForm/SignForm';
import {registrationInput} from '../services/AuthService';
import {registrationThunk} from '../redux/reducers/auth/thunks/registrationThunk';

import {Box} from '@mui/material';
import {useAppDispatch} from '../hooks/redux';

export const SignInPage: FC = () => {
	const dispatch = useAppDispatch();
	const signin = (data: registrationInput) => {
		const {email, password} = data;
		dispatch(registrationThunk({email, password}));
	};

	return (
		<Box sx={{mt: '20vh', w: 700, display: 'flex', justifyContent: 'center'}}>
			<SignForm signFormSubmit={signin} />
		</Box>
	);
};
