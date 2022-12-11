import React, {useState} from 'react';

import {
	Box,
	Autocomplete,
	TextField,
	TextareaAutosize,
	Button,
} from '@mui/material';
import {ButtonOriginal} from '../Button/ButtonOriginal';

export const ReviewCreateForm = () => {
	const artGroupOptions = ['Books', 'Games', 'Movies'];

	const [title, setTitle] = useState('');
	const [artPiece, setArtPiece] = useState('');
	const [artGroup, setArtGroup] = useState<string | null>(null);
	const [text, setText] = useState('');

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const response = await axios.post('https://localhost:5000/reviews', {});
	// };
	return (
		<Box
			component="form"
			// onSubmit={handleSubmit}
			sx={{
				width: 800,
				maxWidth: 1000,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<TextField
				sx={{m: '10px auto', width: '100%'}}
				onChange={(event) => setTitle(event.target.value)}
				label="Review title"
				variant="outlined"
				value={title}
				color="error"
			/>
			<TextField
				sx={{m: '10px auto', width: '100%'}}
				onChange={(event) => setArtPiece(event.target.value)}
				label="Art piece"
				variant="outlined"
				value={artPiece}
				color="error"
			/>

			<Autocomplete
				disablePortal
				value={artGroup}
				onChange={(event: any, newValue: string | null) => {
					setArtGroup(newValue);
				}}
				options={artGroupOptions}
				autoHighlight
				sx={{m: '10px auto', width: '100%'}}
				renderInput={(params) => <TextField {...params} label="Art group" />}
			/>
			<TextareaAutosize
				style={{
					width: '97%',
					padding: '10px',
					fontSize: '22px',
					fontFamily: 'Roboto',
					color: '#245943',
					border: '1px solid #B2A9A3',
					borderRadius: '5px',
				}}
				onChange={(event) => setText(event.target.value)}
				minRows={3}
				placeholder=" How do you like it?"
				value={text}
				color="error"
			/>
			<ButtonOriginal
				extraStyles={{
					m: '20px auto',
					width: '150px',
				}}
				text="create"
			/>
		</Box>
	);
};
