import React, {FC} from 'react';

import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {loginThunk} from '../redux/reducers/auth/thunks/loginThunk';
import {registrationInput} from '../services/AuthService';

import {useTranslation} from 'react-i18next';

import {Box, Chip, Divider} from '@mui/material';

import {AppRoutes} from '../components/AppRouter/interface';
import {SignForm} from '../components/SignForm/SignForm';
import {ButtonOriginal} from '../components/Button/ButtonOriginal';
import {ButtonTypes, ButtonVariants} from '../components/Button/interface';

export const SignInPage: FC = () => {
	const dispatch = useAppDispatch();

	const {t} = useTranslation();

	const {isAuth} = useAppSelector((state) => state.authReducer);

	const signin = (data: registrationInput) => {
		const {email, password} = data;
		dispatch(loginThunk({email, password}));
	};

	if (isAuth) return <Navigate to={AppRoutes.HOME} />;

	const handleGoogle = () => {
		window.open(process.env.REACT_APP_SERVER_URL + '/api/auth/google', '_self');
	};
	const handleGitHub = () => {
		window.open(process.env.REACT_APP_SERVER_URL + '/api/auth/github', '_self');
	};

	return (
		<Box
			sx={{
				m: '10vh auto',
				width: '350px',
				maxWidth: '90vw',
				display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap',
			}}
		>
			<SignForm signFormSubmit={signin} />

			<Box
				sx={{
					m: '10px auto',
					display: 'flex',
					flexDirection: 'column',
					width: '350px',
				}}
			>
				<ButtonOriginal
					text={t('SignIn.google')}
					onClick={handleGoogle}
					type={ButtonTypes.BUTTON}
					variant={ButtonVariants.CONTAINED}
					extraStyles={{
						mt: '10px',
						width: '100%',
						fontSize: '16px',
						fontWeight: 600,
					}}
				/>
				<ButtonOriginal
					text={t('SignIn.gitHub')}
					onClick={handleGitHub}
					type={ButtonTypes.BUTTON}
					variant={ButtonVariants.CONTAINED}
					extraStyles={{
						mt: '10px',
						width: '100%',
						fontSize: '16px',
						fontWeight: 600,
					}}
				/>
			</Box>
		</Box>
	);
};
