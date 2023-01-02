import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks/redux';

import {Box, Card, Typography} from '@mui/material';
import {IReview} from '../../models/IReview';
import {
	deleteExactReview,
	getReviewsByUser,
} from '../../services/ReviewService';
import {ReviewCard} from '../ReviewCard/ReviewCard';

export const ReviewsTable: FC = () => {
	const [reviewsByUser, setReviewsByUser] = useState<IReview[]>([]);

	const {user} = useAppSelector((state) => state.authReducer);

	const fetchMyReviews = async () => {
		const byUser = await getReviewsByUser(user.id);
		setReviewsByUser(byUser.data);
	};

	const deleteReview = async (id: string) => {
		const response = await deleteExactReview(id);
		setReviewsByUser((prev) => prev.filter((item) => item._id !== id));
	};

	useEffect(() => {
		fetchMyReviews();
	}, [reviewsByUser]);

	return (
		<Box>
			<Typography
				sx={{
					m: '40px auto',
					width: '100%',
					textAlign: 'center',
					fontSize: '18px',
				}}
			>
				My REVIEWS
			</Typography>
			<Card
				sx={{
					m: '20px auto',
					p: '20px 20px 0 20px',
					width: '80vw',
					maxWidth: '80vw',
					height: 'fit-content',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-evenly',
				}}
			>
				{reviewsByUser.map((review) => (
					<ReviewCard
						review={review}
						key={review._id}
						isFull={false}
						isMine={true}
						setReviews={setReviewsByUser}
						deleteReview={() => deleteReview(review._id)}
					/>
				))}
			</Card>
		</Box>
	);
};
