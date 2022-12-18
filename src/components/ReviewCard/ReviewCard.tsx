import React, {FC} from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const ReviewCard: FC = () => {
	return (
		<Card sx={{maxWidth: 500}}>
			<CardHeader
				avatar={<Avatar color="error">K</Avatar>}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title="Troll"
				subheader="December, 10 2022"
			/>
			<CardMedia component="img" height="194" image="" alt="masterpiece" />
			<CardContent>
				<Typography variant="body2" color="error">
					While light on narrative, it’s when director Roar Uthaug embraces the
					film's monster that Troll reveals its magic.
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton>
					<FavoriteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};
