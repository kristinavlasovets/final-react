import React from 'react';

import {Box, Typography} from '@mui/material';
import {ReviewCreateForm} from '../components/ReviewCreateForm/ReviewCreateForm';

export const ReviewCreatePage = () => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Typography
				sx={{
					mt: '20px',
					mb: '20px',
					width: '100%',
					textAlign: 'center',
					fontSize: '32px',
				}}
			>
				Create a REVIEW
			</Typography>
			<Box sx={{margin: '0 auto'}}>
				<ReviewCreateForm />
			</Box>
		</Box>
	);
};
