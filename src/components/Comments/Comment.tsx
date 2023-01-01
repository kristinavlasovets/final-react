import React, {FC} from 'react';

import {
	Card,
	Avatar,
	Box,
	Typography,
	CardContent,
	Divider,
} from '@mui/material';

import {CommentProps} from './interface';

export const Comment: FC<CommentProps> = ({name, userId, text}) => {
	console.log(name);
	return (
		<Card
			sx={{
				maxWidth: '90vw',
				width: 800,
				height: 'fit-content',
				maxHeight: 500,
				backgroundColor: '#fffff',
				mb: '15px',
			}}
		>
			<CardContent>
				<Box sx={{display: 'flex', flexDirection: 'row', height: '28px'}}>
					<Avatar sx={{width: 28, height: 28, mr: '20px'}}>
						{name ? name.slice(0, 1).toUpperCase() : 'A'}
					</Avatar>
					<Typography sx={{verticalAlign: 'center', fontSize: '18px'}}>
						{name ? name : 'anonymous'}
					</Typography>
				</Box>
				<Divider sx={{mt: '10px'}} />
				<Typography sx={{width: '100%', p: '10px', wordWrap: 'break-word'}}>
					{text}
				</Typography>
			</CardContent>
		</Card>
	);
};
