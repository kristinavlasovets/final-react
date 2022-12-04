import React, {FC, useState} from 'react';
import {Box, TextField, Button} from '@material-ui/core';

export const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
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
			<Button color="secondary">sign up</Button>
		</Box>
	);
};
