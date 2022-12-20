import React, {FC, useEffect, useState} from 'react';

import {Box, Typography} from '@mui/material';
import {ReviewCard} from '../components/ReviewCard/ReviewCard';
import {IReview} from '../models/IReview';
import {getAllReviews} from '../services/ReviewService';

export const HomePage: FC = () => {
	const [reviews, setReviews] = useState<IReview[]>([]);

	const fetchReviews = async () => {
		const response = await getAllReviews();
		setReviews(response.data);
	};
	useEffect(() => {
		fetchReviews();
	}, []);

	console.log(reviews);

	return (
		<Box
			sx={{
				mt: '10vh',
				width: '100%',
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
					m: '20px auto',
					width: '90vw',
					maxWidth: '95vw',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-evenly',
				}}
			>
				{reviews.map((review) => (
					<ReviewCard review={review} key={review._id} isFull={false} />
				))}
			</Box>
		</Box>
	);
};
