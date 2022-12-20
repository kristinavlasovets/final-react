import React, {FC} from 'react';
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
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import TagIcon from '@mui/icons-material/Tag';

import {AppRoutes} from '../AppRouter/interface';
import {ReviewCardProps} from './interface';
import {ButtonLink} from '../Button/ButtonLink';
import {ButtonVariants} from '../Button/interface';
import {likeReview} from '../../services/ReviewService';

export const ReviewCard: FC<ReviewCardProps> = ({review, isFull = false}) => {
	const {
		_id,
		author,
		title,
		image,
		artPiece,
		group,
		text,
		grade,
		tags,
		likes,
		creationDate,
	} = review;

	const handleTag = () => {
		console.log(tags);
	};

	const handleLike = () => {
		console.log(likes);
	};

	return (
		<Card
			sx={{
				maxWidth: isFull ? '90vw' : 500,
				width: isFull ? 1000 : 450,
				mb: '30px',
			}}
		>
			<CardMedia
				component="img"
				height={isFull ? '600' : '300'}
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
					{title}
				</Typography>

				<Typography
					sx={{
						fontSize: isFull ? '22px' : '',
					}}
					variant="body2"
					color="text.secondary"
				>
					{isFull ? `${author.email} about '${artPiece.name}'` : artPiece.name}
				</Typography>
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
							label={group}
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
				<Badge badgeContent={likes} color="error">
					<IconButton sx={{ml: '5px'}} onClick={handleLike}>
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
							width: '150px',
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
