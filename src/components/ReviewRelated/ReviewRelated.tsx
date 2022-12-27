import {Box} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import {IReview} from '../../models/IReview';
import {getRelatedReviews} from '../../services/ReviewService';
import {ReviewCard} from '../ReviewCard/ReviewCard';
import {ReviewRelatedProps} from './interface';

export const ReviewRelated: FC<ReviewRelatedProps> = ({exactReview}) => {
	const [relatedReviews, setRelatedReviews] = useState<IReview[]>([]);

	const fetchRelatedReviews = async () => {
		const response = await getRelatedReviews();
		setRelatedReviews(response.data);
	};

	useEffect(() => {
		fetchRelatedReviews();
	}, []);

	console.log(relatedReviews);
	return (
		<Box>
			{relatedReviews.map((review) => (
				<ReviewCard review={review} key={review._id} />
			))}
		</Box>
	);
};
