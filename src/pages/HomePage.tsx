import React from 'react';

import {Box, Typography} from '@mui/material';

export const HomePage = () => {
	return (
		<Box sx={{mt: '20vh', w: 700, display: 'flex', justifyContent: 'center'}}>
			<Typography
				sx={{mb: '50px', width: '100%', textAlign: 'center', fontSize: '32px'}}
			>
				Welcome to ROTTEN
			</Typography>
		</Box>
	);
};
