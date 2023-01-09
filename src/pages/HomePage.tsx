import React, {FC, useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';

import {Box, Typography, Chip} from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import {ReviewCard} from '../components/ReviewCard/ReviewCard';
import {IReview} from '../models/IReview';
import {
	getAllTags,
	getMostRatedReviews,
	getMostRecentReviews,
	getReviewsByTag,
} from '../services/ReviewService';

import {loginViaSocialThunk} from '../redux/reducers/auth/thunks/loginViaSocial';
import {useAppSelector, useAppDispatch} from '../hooks/redux';

export const HomePage: FC = () => {
	const [mostRatedReviews, setMostRatedReviews] = useState<IReview[]>([]);
	const [mostRecentReviews, setMostRecentReviews] = useState<IReview[]>([]);
	const [tags, setTags] = useState<string[]>([]);
	const [clickedTag, setClickedTag] = useState<string>();
	const [reviewsByTag, setReviewsByTag] = useState<IReview[]>([]);

	const {viaSocial, isAuth} = useAppSelector((state) => state.authReducer);

	const {t} = useTranslation();

	const dispatch = useAppDispatch();

	const fetchAllTags = async () => {
		const response = await getAllTags();
		setTags(response.data);
	};

	const fetchReviews = async () => {
		const rated = await getMostRatedReviews();
		setMostRatedReviews(rated.data);
		const recent = await getMostRecentReviews();
		setMostRecentReviews(recent.data);
	};

	const handleTag = async (tag: string) => {
		const byTag = await getReviewsByTag(tag!);
		setReviewsByTag(byTag.data);
		setClickedTag(tag);
	};

	useEffect(() => {
		fetchReviews();
		fetchAllTags();
	}, []);

	useEffect(() => {
		if (viaSocial && !isAuth) {
			dispatch(loginViaSocialThunk());
		}
	}, []);

	return (
		<Box
			sx={{
				mt: '5vh',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Typography sx={{mb: '50px', textAlign: 'center', fontSize: '32px'}}>
				{t('Home.0')}
			</Typography>

			<Box
				sx={{
					width: '90vw',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
				<TagIcon sx={{mr: '15px', fontSize: 32}} color="error" />
				{tags.map((tag) => (
					<Chip
						key={tag}
						sx={{m: '5px', p: '5px', fontSize: '16px', cursor: 'pointer'}}
						label={tag}
						onClick={() => handleTag(tag)}
					/>
				))}
			</Box>

			{clickedTag && (
				<Typography
					color="error"
					sx={{mt: '30px', pl: '100px', fontSize: '22px'}}
				>
					{t('Home.1')}
					{clickedTag}
				</Typography>
			)}
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
				{reviewsByTag.map((review) => (
					<ReviewCard
						review={review}
						key={review._id}
						isFull={false}
						setReviews={setReviewsByTag}
					/>
				))}
			</Box>

			<Typography color="error" sx={{fontSize: '22px', pl: '100px'}}>
				{t('Home.2')}
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
				{mostRatedReviews.map((review) => (
					<ReviewCard
						review={review}
						key={review._id}
						isFull={false}
						setReviews={setMostRatedReviews}
					/>
				))}
			</Box>
			<Typography
				color="error"
				sx={{
					mt: '100px',
					pl: '100px',
					fontSize: '22px',
				}}
			>
				{t('Home.3')}
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
				{mostRecentReviews.map((review) => (
					<ReviewCard
						review={review}
						key={review._id}
						isFull={false}
						setReviews={setMostRecentReviews}
					/>
				))}
			</Box>
		</Box>
	);
};
