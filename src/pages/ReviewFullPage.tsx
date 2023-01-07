import React, {FormEvent, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {io} from 'socket.io-client';
import type {Socket} from 'socket.io-client';
import {useAppSelector} from '../hooks/redux';

import {useTranslation} from 'react-i18next';

import {Box, TextField} from '@mui/material';

import {Comment} from '../components/Comments/Comment';
import {ButtonOriginal} from '../components/Button/ButtonOriginal';
import {ButtonTypes} from '../components/Button/interface';
import {ReviewCard} from '../components/ReviewCard/ReviewCard';

import {IReview} from '../models/IReview';
import {IComment} from '../models/IComment';

import {getExactReview, getRelatedReviews} from '../services/ReviewService';
import {createComment, getComments} from '../services/CommentService';

export const ReviewFullPage = () => {
	const [comments, setComments] = useState([] as IComment[]);
	const [commentValue, setCommentValue] = useState('');
	const [name, setName] = useState('');
	const [exactReview, setExactReview] = useState({} as IReview);
	const [relatedReviews, setRelatedReviews] = useState<IReview[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [socket, setSocket] = useState<Socket | null>(null);

	const {id} = useParams();

	const {user, isAuth} = useAppSelector((state) => state.authReducer);

	const {t} = useTranslation();

	const fetchExactReview = async () => {
		const response = await getExactReview(id!);
		setExactReview(response.data);
		setIsLoading(false);
	};

	const fetchComments = async () => {
		const response = await getComments(id!);
		setComments(response.data);
	};

	const fetchRelatedReviews = async () => {
		const response = await getRelatedReviews(exactReview.artPiece!._id!);
		setRelatedReviews(response.data);
	};

	useEffect(() => {
		fetchExactReview();
		fetchComments();
	}, []);

	useEffect(() => {
		fetchRelatedReviews();
	}, [exactReview]);

	useEffect(() => {
		setSocket(io(process.env.REACT_APP_SOCKET_URL!));
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on('getComment', (data) => {
				setComments((prev) =>
					prev.concat({
						_id: Date.now().toString(),
						name: data.name,
						userId: data.userId,
						desc: data.desc,
						reviewId: data.reviewId,
					})
				);
			});
		}
	}, [socket]);

	const handleFullLike = () => {
		setExactReview((prev) =>
			prev.likes.includes(user.id)
				? {...prev, likes: prev.likes.filter((item) => item !== user.id)}
				: {...prev, likes: [...prev.likes, user.id]}
		);
	};

	if (isLoading) {
		return (
			<Box
				sx={{
					width: '100%',
					m: '45vh auto',
					display: 'flex',
					justifyContent: 'center',
					fontSize: '22px',
				}}
			>
				Loading...
			</Box>
		);
	}

	const handleCommentValue = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setCommentValue(e.target.value);
	};

	const handleName = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setName(e.target.value);
	};

	const clearCommentValue = () => {
		setCommentValue('');
	};

	const onSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		socket!.emit('sendComment', {
			name: name,
			userId: user.id,
			reviewId: exactReview._id,
			desc: commentValue,
		});

		await createComment({
			name: name,
			userId: user.id,
			reviewId: exactReview._id,
			desc: commentValue,
		});

		clearCommentValue();
	};

	return (
		<Box
			sx={{
				m: '5vh auto',
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
			}}
		>
			<Box
				sx={{
					p: '30px 0 0 30px',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<ReviewCard
					review={exactReview}
					isFull={true}
					handleFullLike={handleFullLike}
				/>

				<Box
					sx={{
						maxWidth: '90vw',
						width: 800,
						height: 'fit-content',
						m: '0 auto',
					}}
				>
					{!isLoading && isAuth && (
						<>
							<Box
								sx={{
									width: '100%',
									maxWidth: '90vw',
									display: 'flex',
									flexWrap: 'wrap',
									m: '0 auto',
								}}
								component="form"
								onSubmit={onSubmitComment}
							>
								<TextField
									variant="standard"
									sx={{width: 800, mb: '20px', p: '15px'}}
									value={name}
									onChange={handleName}
									placeholder={`${t('Comment.name')}`}
								/>
								<TextField
									sx={{width: 800}}
									value={commentValue}
									onChange={handleCommentValue}
									placeholder={`${t('Comment.placeholder')}`}
									multiline
									rows={3}
								/>
								<ButtonOriginal
									extraStyles={{
										m: '20px auto',
										width: '100px',
										backgroundColor: 'lightgrey',
										borderColor: 'lightgrey',
										color: 'grey',
									}}
									text={t('Comment.cancel')}
									onClick={clearCommentValue}
								/>
								<ButtonOriginal
									extraStyles={{
										m: '20px auto',
										width: '100px',
									}}
									text={t('Comment.comment')}
									type={ButtonTypes.SUBMIT}
								/>
							</Box>
						</>
					)}
				</Box>
				<Box
					sx={{
						m: '20px auto',
					}}
				>
					{comments.map((comment) => (
						<Comment
							key={comment._id}
							userId={comment.userId}
							text={comment.desc}
							name={comment.name}
						/>
					))}
				</Box>
			</Box>
			<Box
				sx={{
					m: '5vh auto',
					display: 'flex',
					justifyContent: 'space-around',
				}}
			>
				<Box>
					{relatedReviews
						.filter((review) => review._id !== exactReview._id)
						.map((review) => (
							<ReviewCard review={review} key={review._id} />
						))}
				</Box>
			</Box>
		</Box>
	);
};
