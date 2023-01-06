import {Box} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import {IReview} from '../../models/IReview';
import {getRelatedReviews} from '../../services/ReviewService';
import {ReviewCard} from '../ReviewCard/ReviewCard';
import {ReviewRelatedProps} from './interface';

export const ReviewRelated: FC<ReviewRelatedProps> = ({exactReview}) => {
	const [relatedReviews, setRelatedReviews] = useState<IReview[]>([]);

	const fetchRelatedReviews = async () => {
		const response = await getRelatedReviews(exactReview.artPiece._id!);
		setRelatedReviews(response.data);
	};

	useEffect(() => {
		fetchRelatedReviews();
	}, []);

	console.log(exactReview);
	console.log(relatedReviews);

	return (
		<Box>
			{relatedReviews
				.filter((review) => review._id !== exactReview._id)
				.map((review) => (
					<ReviewCard review={review} key={review._id} />
				))}
		</Box>
	);
};
