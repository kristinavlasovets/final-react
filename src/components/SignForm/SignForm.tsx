import React, {FC} from 'react';

import {useForm} from 'react-hook-form';
import {Box, TextField} from '@mui/material';
import {useAppDispatch} from '../../hooks/redux';
import {registrationThunk} from '../../redux/reducers/auth/registrationThunk';
import {ButtonOriginal} from '../Button/ButtonOriginal';
import {ButtonTypes, ButtonVariants} from '../Button/interface';
import {ButtonLink} from '../Button/ButtonLink';
import {AppRoutes} from '../AppRouter/interface';

type FormData = {
	email: string;
	password: string;
};

export const SignForm: FC = () => {
	const dispatch = useAppDispatch();

	// const handleRegistration = async () => {
	// 	dispatch(registrationThunk({email, password}));
	// };
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<FormData>();

	const onSubmit = handleSubmit((data) => console.log(data));
	return (
		<Box component="form" onSubmit={onSubmit}>
			<TextField
				{...register('email', {required: true})}
				name="email"
				type="text"
				label="email"
				variant="outlined"
				aria-invalid={errors.email ? 'true' : 'false'}
			/>{' '}
			{errors.email?.type === 'required' && (
				<p role="alert">Email is required</p>
			)}
			<TextField
				{...register('password', {required: 'Password is required'})}
				name="password"
				type="password"
				label="password"
				variant="outlined"
				color="error"
				aria-invalid={errors.password ? 'true' : 'false'}
			/>
			{errors.password && <p role="alert">{errors.password?.message}</p>}
			<ButtonLink text="sign in" path={AppRoutes.SIGNIN} />
			<ButtonOriginal text="sign up" type={ButtonTypes.SUBMIT} />
		</Box>
	);
};
