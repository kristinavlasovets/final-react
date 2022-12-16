import {Box, Typography} from '@mui/material';
import axios from 'axios';
import React, {useState} from 'react';

export const ImageBlock = () => {
	const [drag, setDrag] = useState(false);
	const [imageSelected, setImageSelected] = useState<string | Blob>('');

	const dragStartHandler = (e: React.DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		setDrag(true);
	};
	const dragLeaveHandler = (e: React.DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		setDrag(false);
	};

	const uploadImage = async () => {
		const formData = new FormData();
		formData.append('file', imageSelected);
		formData.append('upload_preset', 'mauuttir');

		const response = await axios.post(
			'https://api.cloudinary.com/v1_1/kvlasovets/image/upload',
			formData
		);
		console.log(response);
	};

	const onDropHandler = (e: React.DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		const poster = e.dataTransfer.files[0];
		console.log(poster);
		setImageSelected(poster);
		uploadImage();
		setDrag(false);
	};

	return (
		<Box
			sx={{
				m: '20px auto',
				width: 600,
				maxWidth: 600,
				height: 300,
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
						Drop
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
						Drag your poster here to start uploading
					</Typography>
				</Box>
			)}
		</Box>
	);
};
