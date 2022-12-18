import React from 'react';

import {Box, Typography} from '@mui/material';
import {ReviewCreateForm} from '../components/ReviewCreateForm/ReviewCreateForm';

export const ReviewCreatePage = () => {
	return (
		<Box
			sx={{
				m: '10vh auto',
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
					fontSize: '32px',
					textTransform: 'uppercase',
					color: 'gray',
				}}
			>
				Create a review
			</Typography>
			<Box sx={{margin: '0 auto'}}>
				<ReviewCreateForm />
			</Box>
		</Box>
	);
};
