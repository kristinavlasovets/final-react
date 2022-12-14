import {Box} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Typography,
} from '@mui/material';

import {IReview} from '../models/IReview';
import {AppRoutes} from '../components/AppRouter/interface';

export const ReviewsBySearch: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [reviewsBySearch, setReviewsBySearch] = useState<IReview[]>([]);

	useEffect(() => {
		setReviewsBySearch(location.state);
	}, [reviewsBySearch]);

	return (
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
			<List sx={{width: '100%', maxWidth: '90vw', bgcolor: 'background.paper'}}>
				{reviewsBySearch.length > 0 &&
					reviewsBySearch.map((review) => (
						<ListItem
							key={review._id}
							alignItems="flex-start"
							onClick={() =>
								navigate(AppRoutes.HOME + 'review-full' + `/${review._id}`)
							}
						>
							<ListItemAvatar>
								<Avatar src={review.image} />
							</ListItemAvatar>
							<ListItemText
								primary={review.title}
								secondary={
									<React.Fragment>
										<Typography
											sx={{display: 'inline'}}
											component="span"
											variant="body2"
											color="text.primary"
										>
											{review.artGroup} :
										</Typography>
										{review.text.slice(0, 500)} ...
									</React.Fragment>
								}
							/>
						</ListItem>
					))}
			</List>
		</Box>
	);
};
