import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {ReviewCard} from '../components/ReviewCard/ReviewCard';
import {IReview} from '../models/IReview';
import {getExactReview} from '../services/ReviewService';

import {Box} from '@mui/material';

export const ReviewFullPage = () => {
	const [exactReview, setExactReview] = useState({} as IReview);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const {id} = useParams();

	const fetchExactReview = async () => {
		const response = await getExactReview(id!);
		setExactReview(response.data);
		setIsLoading(false);
	};
	useEffect(() => {
		fetchExactReview();
	}, []);

	console.log(exactReview);

	if (isLoading) {
		return <div>is Loading</div>;
	}
	return (
		<Box
			sx={{
				m: '5vh auto',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<ReviewCard review={exactReview} isFull={true} />
		</Box>
	);
};
