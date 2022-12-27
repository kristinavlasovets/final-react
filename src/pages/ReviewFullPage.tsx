import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {ReviewCard} from '../components/ReviewCard/ReviewCard';
import {IReview} from '../models/IReview';
import {getExactReview} from '../services/ReviewService';

import {Box} from '@mui/material';
import {useAppSelector} from '../hooks/redux';
import {ReviewRelated} from '../components/ReviewRelated/ReviewRelated';

export const ReviewFullPage = () => {
	const [exactReview, setExactReview] = useState({} as IReview);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const {id} = useParams();

	const {user} = useAppSelector((state) => state.authReducer);

	const fetchExactReview = async () => {
		const response = await getExactReview(id!);
		setExactReview(response.data);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchExactReview();
	}, []);

	const handleFullLike = () => {
		setExactReview((prev) =>
			prev.likes.includes(user.id)
				? {...prev, likes: prev.likes.filter((item) => item !== user.id)}
				: {...prev, likes: [...prev.likes, user.id]}
		);
	};

	if (isLoading) {
		return <div>is Loading</div>;
	}

	return (
		<Box
			sx={{
				m: '5vh auto',
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
			}}
		>
			<ReviewCard
				review={exactReview}
				isFull={true}
				handleFullLike={handleFullLike}
			/>
			<Box
				sx={{
					m: '5vh auto',
					display: 'flex',
					justifyContent: 'space-around',
				}}
			>
				<ReviewRelated exactReview={exactReview} />
			</Box>
		</Box>
	);
};
