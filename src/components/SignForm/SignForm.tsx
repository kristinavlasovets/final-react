import React, {FC} from 'react';

import {SubmitHandler, useForm} from 'react-hook-form';

import {AppRoutes} from '../AppRouter/interface';

import {Box, TextField, Typography} from '@mui/material';

import {ButtonOriginal} from '../Button/ButtonOriginal';
import {ButtonTypes, ButtonVariants} from '../Button/interface';
import {Link} from 'react-router-dom';
import {SignFormProps, FormData} from './interface';
import {auth, provider} from '../../firebase';
import {signInWithPopup} from 'firebase/auth';
import axios from 'axios';
import {useAppDispatch} from '../../hooks/redux';

export const SignForm: FC<SignFormProps> = ({
	isSignup = false,
	signFormSubmit,
}) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<FormData>({mode: 'onBlur'});

	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const {email, password} = data;
		signFormSubmit({email, password});
		reset();
	};

	const signInWithGoogle = async () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				axios
					.post('/api/login/google', {
						email: result.user.displayName,
					})
					.then((res) => {
						return res.data;
					});
			})
			.catch((error) => {
				console.log('Sign in with Google error');
			});
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '350px',
			}}
			component="form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Typography
				sx={{mb: '50px', width: '100%', textAlign: 'center', fontSize: '32px'}}
			>
				{isSignup ? 'Sign up' : 'Sign in'} for ROTTEN
			</Typography>

			{/* SOCIAL APP */}
			{isSignup ? (
				''
			) : (
				<ButtonOriginal
					extraStyles={{
						mb: '40px',
						width: '100%',
						fontSize: '16px',
						fontWeight: 600,
					}}
					text={'sign in with Google'}
					type={ButtonTypes.BUTTON}
					variant={ButtonVariants.CONTAINED}
					onClick={signInWithGoogle}
				/>
			)}
			{/* SOCIAL APP */}
			<TextField
				{...register('email', {required: true})}
				name="email"
				type="text"
				label="email"
				variant="outlined"
				color="error"
				aria-invalid={errors.email ? 'true' : 'false'}
			/>
			{errors.email?.type === 'required' && (
				<p role="alert">Email is required</p>
			)}
			<TextField
				sx={{mt: '10px'}}
				{...register('password', {required: 'Password is required'})}
				name="password"
				type="password"
				label="password"
				variant="outlined"
				color="error"
				aria-invalid={errors.password ? 'true' : 'false'}
			/>
			{errors.password && <p role="alert">{errors.password?.message}</p>}
			<ButtonOriginal
				text={isSignup ? 'sign up' : 'sign in'}
				type={ButtonTypes.SUBMIT}
				variant={ButtonVariants.CONTAINED}
				extraStyles={{
					mt: '30px',
					width: '100%',
					fontSize: '16px',
					fontWeight: 600,
				}}
			/>
			<Box sx={{display: 'flex', justifyContent: 'center'}}>
				<Typography sx={{mt: '10px'}}>
					{!isSignup ? 'No account yet?' : 'Already have an account?'}
				</Typography>{' '}
				<Link
					style={{margin: '10px'}}
					to={!isSignup ? AppRoutes.SIGNUP : AppRoutes.SIGNIN}
				>
					{!isSignup ? 'Sign up' : 'Sign in'}
				</Link>
			</Box>
		</Box>
	);
};
