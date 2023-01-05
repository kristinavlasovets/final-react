import React, {FC, useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';

import {
	Badge,
	Box,
	Chip,
	Divider,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	IconButton,
	Typography,
	Rating,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TagIcon from '@mui/icons-material/Tag';
import StarIcon from '@mui/icons-material/Star';

import {AppRoutes} from '../AppRouter/interface';
import {ReviewCardProps} from './interface';
import {ButtonLink} from '../Button/ButtonLink';
import {ButtonVariants} from '../Button/interface';
import {likeReview} from '../../services/UserService';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useNavigate} from 'react-router-dom';
import {like} from '../../redux/reducers/auth/AuthSlice';
import {rateArtPieces} from '../../services/ArtPieceService';
import {getReviewsByUser} from '../../services/ReviewService';
import {IReview} from '../../models/IReview';

export const ReviewCard: FC<ReviewCardProps> = ({
	review,
	isFull = false,
	isMine = false,
	setReviews,
	deleteReview,
	handleFullLike,
}) => {
	const [reviewsByUser, setReviewsByUser] = useState<IReview[]>([]);
	const [value, setValue] = useState<number | null>(null);
	const [hover, setHover] = useState(-1);
	const {user, isAuth} = useAppSelector((state) => state.authReducer);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {
		_id,
		author,
		title,
		image,
		artPiece,
		artGroup,
		text,
		grade,
		tags,
		likes,
		creationDate,
	} = review;

	const minititle = title.length > 25 ? title.slice(0, 25) + '...' : title;

	const fetchMyReviews = async () => {
		const byUser = await getReviewsByUser(author._id);
		setReviewsByUser(byUser.data);
	};

	const userTotalLikes = reviewsByUser
		.map((item) => item.likes.length)
		.reduce((acc, curr) => acc + curr, 0);

	useEffect(() => {
		let totalNumber: number = +review.artPiece.totalRating!;
		setValue(totalNumber!);
		fetchMyReviews();
	}, []);

	const handleTag = () => {
		console.log(tags);
	};

	const handleLike = async () => {
		dispatch(like(review._id));
		if (setReviews && !isFull) {
			setReviews((prev) => {
				const currReview = prev.find((item) => item._id === review._id);
				if (currReview!.likes.includes(user.id)) {
					currReview!.likes = currReview!.likes.filter(
						(item) => item !== user.id
					);
				} else {
					currReview!.likes = [...currReview!.likes, user.id];
				}

				return prev;
			});
		}

		if (isFull) {
			handleFullLike!();
		}
		await likeReview(review?._id, user.id);
	};

	const handleRedirect = () => {
		navigate(AppRoutes.SIGNIN);
		return;
	};

	const handleRate = async (
		star: number,
		artPieceId: string,
		userId: string
	) => {
		const response = await rateArtPieces(star, artPieceId, userId);
	};

	return (
		<Card
			sx={{
				maxHeight: isFull ? 'fit-content' : 800,
				height: 'fit-content',
				maxWidth: isFull ? '90vw' : 300,
				width: isFull ? 900 : 250,
				mb: '30px',
				m: isFull ? '45px' : '',
			}}
		>
			<CardMedia
				component="img"
				height={isFull ? '600' : '200'}
				image={image}
				alt="artPiece"
			/>
			<CardContent
				sx={{
					m: isFull ? '30px 0 30px 30px' : '',
				}}
			>
				<Typography
					sx={{
						fontSize: isFull ? '32px' : '',
					}}
					gutterBottom
					variant="h5"
					component="div"
				>
					{isFull ? title : minititle}
				</Typography>
				<Box
					sx={{
						display: 'flex',
					}}
				>
					{userTotalLikes && isFull ? (
						<Badge
							sx={{mr: '15px'}}
							badgeContent={userTotalLikes}
							color="error"
						>
							<FavoriteIcon fontSize="large" sx={{color: 'red'}} />
						</Badge>
					) : (
						''
					)}
					<Typography
						sx={{
							fontSize: isFull ? '18px' : '',
						}}
						variant="body2"
						color="text.secondary"
					>
						{isFull
							? `${author.email} about '${artPiece.name}'`
							: artPiece.name}
					</Typography>
					<Rating
						sx={{ml: isFull ? '20px' : '10px'}}
						name="hover-feedback"
						size={isFull ? 'medium' : 'small'}
						value={value}
						precision={1}
						onChange={(event, newValue) => {
							setValue(newValue);
							{
								isAuth
									? handleRate(newValue!, artPiece!._id!, user.id)
									: handleRedirect();
							}
						}}
						onChangeActive={(event, newHover) => {
							setHover(newHover);
						}}
						emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit" />}
					/>
					<Typography
						sx={{
							mt: isFull ? '' : '-5px',
							ml: isFull ? '20px' : '10px',
							fontSize: isFull ? '24px' : '18px',
							lineHeight: isFull ? '24px' : '18px',
							fontWeight: 900,
							color: '#f6b135',
						}}
					>
						{value}
						<StarIcon fontSize={isFull ? 'medium' : 'small'} />
					</Typography>
				</Box>

				{isFull ? (
					<Typography
						sx={{mt: '10px', fontSize: '18px'}}
						variant="body2"
						color="text.secondary"
					>
						Author's grade: {grade}/10 {creationDate}
					</Typography>
				) : (
					''
				)}

				{isFull ? (
					<Divider sx={{m: '40px auto', width: '100%'}}>
						<Chip
							sx={{p: '15px', fontSize: '18px'}}
							variant="outlined"
							label={artGroup}
						/>
					</Divider>
				) : (
					''
				)}
				{isFull ? <ReactMarkdown children={text} /> : ''}
				{isFull ? <Divider sx={{m: '40px auto', width: '100%'}} /> : ''}

				{isFull ? (
					<Box sx={{display: 'flex', justifyContent: 'center'}}>
						<TagIcon sx={{mr: '15px', fontSize: 32}} color="error" />
						{tags.map((tag) => (
							<Chip
								key={tag}
								sx={{mr: '20px', p: '5px', fontSize: '16px', cursor: 'pointer'}}
								label={tag}
								onClick={handleTag}
							/>
						))}
					</Box>
				) : (
					''
				)}
			</CardContent>
			<CardActions
				sx={{
					m: isFull ? '30px 0 30px 30px' : '',
					display: isFull || isMine ? 'flex' : '',
					justifyContent: isFull || isMine ? 'center' : '',
				}}
			>
				{isFull ? <Typography>Enjoy the review? Click here</Typography> : ''}
				<Badge sx={{ml: '5px'}} badgeContent={likes?.length} color="error">
					<IconButton
						sx={{
							color: user.likedReviews?.includes(review?._id) ? 'red' : '',
						}}
						onClick={isAuth ? handleLike : handleRedirect}
					>
						<FavoriteIcon />
					</IconButton>
				</Badge>

				{isFull ? <Typography>or go</Typography> : ''}

				{isFull ? (
					<ButtonLink
						extraStyles={{
							ml: '5px',
							width: '160px',
						}}
						text="back to home page"
						path={AppRoutes.HOME}
						variant={ButtonVariants.TEXT}
					/>
				) : (
					<ButtonLink
						extraStyles={{
							ml: '10px',
							width: '100px',
						}}
						text="read more"
						path={AppRoutes.HOME + 'review-full' + `/${_id}`}
						variant={ButtonVariants.TEXT}
					/>
				)}

				{isMine ? (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<IconButton onClick={deleteReview}>
							<DeleteIcon fontSize="small" />
						</IconButton>
						<ButtonLink
							text="edit"
							path={AppRoutes.HOME + 'review-create' + `/${_id}`}
							variant={ButtonVariants.TEXT}
						/>
					</Box>
				) : (
					''
				)}
			</CardActions>
		</Card>
	);
};
