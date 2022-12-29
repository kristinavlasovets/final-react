import React, {FC, useEffect} from 'react';
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

export const ReviewCard: FC<ReviewCardProps> = ({
	review,
	isFull = false,
	setReviews,
	handleFullLike,
}) => {
	const [value, setValue] = React.useState<number | null>(null);
	const [hover, setHover] = React.useState(-1);
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

	useEffect(() => {
		let totalNumber: number = +review.artPiece.totalRating!;
		setValue(totalNumber!);
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
				width: isFull ? 800 : 250,
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
					<Typography
						sx={{
							fontSize: isFull ? '22px' : '',
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
						size={isFull ? 'large' : 'small'}
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
							fontSize: isFull ? '28px' : '18px',
							lineHeight: isFull ? '32px' : '18px',
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
						sx={{mt: '10px', fontSize: '22px'}}
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
					display: isFull ? 'flex' : '',
					justifyContent: isFull ? 'center' : '',
				}}
			>
				{isFull ? <Typography>Enjoy the review? Click here</Typography> : ''}
				<Badge badgeContent={likes?.length} color="error">
					<IconButton
						sx={{
							ml: '5px',
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
							ml: '10px',
							width: '200px',
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
						path={'review-full' + `/${_id}`}
						variant={ButtonVariants.TEXT}
					/>
				)}
			</CardActions>
		</Card>
	);
};
