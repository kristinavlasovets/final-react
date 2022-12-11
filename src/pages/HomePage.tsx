import React from 'react';

import {Box, Typography} from '@mui/material';
import {ReviewCard} from '../components/ReviewCard/ReviewCard';

export const HomePage = () => {
	return (
		<Box
			sx={{
				mt: '20vh',
				w: 700,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Typography
				sx={{mb: '50px', width: '100%', textAlign: 'center', fontSize: '32px'}}
			>
				Welcome to ROTTEN
			</Typography>
			<Box
				sx={{
					m: '50px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<ReviewCard />
				<ReviewCard />
				<ReviewCard />
			</Box>
		</Box>
	);
};
