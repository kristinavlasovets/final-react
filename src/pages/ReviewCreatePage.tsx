import React from 'react';

import {useTranslation} from 'react-i18next';

import {Box, Typography} from '@mui/material';
import {ReviewCreateForm} from '../components/ReviewCreateForm/ReviewCreateForm';

export const ReviewCreatePage = () => {
	const {t} = useTranslation();
	return (
		<Box
			sx={{
				m: {xs: '5vh auto', md: '10vh auto'},
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Typography
				sx={{
					width: '100%',
					textAlign: 'center',
					fontSize: {xs: '18px', md: '32px'},
					textTransform: 'uppercase',
					color: 'gray',
				}}
			>
				{t('CreateForm.title')}
			</Typography>
			<Box sx={{margin: '0 auto'}}>
				<ReviewCreateForm />
			</Box>
		</Box>
	);
};
