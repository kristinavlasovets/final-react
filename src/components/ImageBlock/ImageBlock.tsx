import React, {useState, FC} from 'react';

import {useTranslation} from 'react-i18next';

import {Box, Typography} from '@mui/material';
import {ImageBlockProps} from './interface';
import {uploadImage} from '../../services/ImageDropService';

export const ImageBlock: FC<ImageBlockProps> = ({setImage}) => {
	const [drag, setDrag] = useState(false);

	const {t} = useTranslation();

	const dragStartHandler = (e: React.DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		setDrag(true);
	};
	const dragLeaveHandler = (e: React.DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		setDrag(false);
	};

	const onDropHandler = async (e: React.DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		let file = e.dataTransfer.files[0];
		const droppedImage = await uploadImage(file);
		setImage(droppedImage.secure_url);

		setDrag(false);
	};

	return (
		<Box
			sx={{
				m: '20px auto',
				width: {xs: '90vw', md: 600},
				maxWidth: 600,
				height: {xs: 150, md: 300},
			}}
		>
			{drag ? (
				<Box
					sx={{
						m: '0 auto',
						width: '100%',
						height: '100%',
						fontSize: '32px',
						color: 'red',
						border: '2px dashed red',
						borderRadius: '7px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					onDragStart={(e: React.DragEvent<HTMLInputElement>) =>
						dragStartHandler(e)
					}
					onDragLeave={(e: React.DragEvent<HTMLInputElement>) =>
						dragLeaveHandler(e)
					}
					onDragOver={(e: React.DragEvent<HTMLInputElement>) =>
						dragStartHandler(e)
					}
					onDrop={(e: React.DragEvent<HTMLInputElement>) => onDropHandler(e)}
				>
					<Typography
						sx={{
							fontSize: '32px',
							color: 'red',
						}}
					>
						{t('CreateForm.drop')}
					</Typography>
				</Box>
			) : (
				<Box
					sx={{
						m: '0 auto',
						width: '100%',
						height: '100%',
						border: '2px dashed gray',
						borderRadius: '7px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					onDragStart={(e: React.DragEvent<HTMLInputElement>) =>
						dragStartHandler(e)
					}
					onDragLeave={(e: React.DragEvent<HTMLInputElement>) =>
						dragLeaveHandler(e)
					}
					onDragOver={(e: React.DragEvent<HTMLInputElement>) =>
						dragStartHandler(e)
					}
				>
					<Typography
						sx={{
							fontSize: '18px',
							color: 'gray',
						}}
					>
						{t('CreateForm.drag')}
					</Typography>
				</Box>
			)}
		</Box>
	);
};
