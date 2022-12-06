import React, {FC, useState} from 'react';
import {Box, TextField, Button} from '@material-ui/core';
import {useAppDispatch} from '../hooks/redux';
import {registrationThunk} from '../redux/reducers/auth/registrationThunk';
import {ButtonOriginal} from './Button/ButtonOriginal';
import {ButtonVariants} from './Button/interface';
import {ButtonLink} from './Button/ButtonLink';
import {AppRoutes} from './AppRouter/interface';

export const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const dispatch = useAppDispatch();

	const handleRegistration = async () => {
		dispatch(registrationThunk({email, password}));
	};
	return (
		<Box>
			<TextField
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				type="text"
				label="email"
				variant="outlined"
			/>
			<TextField
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				type="password"
				label="password"
				variant="outlined"
			/>

			<ButtonLink text="sign in" path={AppRoutes.SIGNIN} />
			<ButtonOriginal text="sign up" onClick={handleRegistration} />
		</Box>
	);
};
