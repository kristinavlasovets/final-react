import React, {FC, useState} from 'react';
import {Box, TextField, Button} from '@material-ui/core';
import {useAppDispatch} from '../hooks/redux';
import {registrationThunk} from '../redux/reducers/auth/registrationThunk';

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
			<Button color="primary">sign in </Button>
			<Button onClick={handleRegistration} color="secondary">
				sign up
			</Button>
		</Box>
	);
};
