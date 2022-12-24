import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppSelector} from '../../hooks/redux';

import {
	Box,
	TextField,
	TextareaAutosize,
	Divider,
	MenuItem,
	InputLabel,
	Chip,
	Stack,
} from '@mui/material';

import Select, {SelectChangeEvent} from '@mui/material/Select';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';

import {ButtonOriginal} from '../Button/ButtonOriginal';
import {ButtonTypes} from '../Button/interface';
import {ArtPieceOptionType} from './interface';
import api from '../../http';
import {sharedArtPiecesUrls, sharedReviewsUrls} from '../../shared/sharedUrls';
import {IArtPiece} from '../../models/IArtPiece';
import {ImageBlock} from '../ImageBlock/ImageBlock';
import ArtPieceService from '../../services/ArtPieceService';
import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../AppRouter/interface';

const filter = createFilterOptions<ArtPieceOptionType>();

export const ReviewCreateForm = () => {
	const artGroupOptions = ['Books', 'Games', 'Movies'];
	const grades = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
	const {user} = useAppSelector((state) => state.authReducer);

	const [title, setTitle] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [artPiece, setArtPiece] = useState<ArtPieceOptionType | null>(null);
	const [artPieces, setArtPieces] = useState<IArtPiece[]>([]);
	const [artGroup, setArtGroup] = useState<string | null>(null);
	const [text, setText] = useState<string>('');
	const [grade, setGrade] = useState<string>('');
	const [tagOptions, setTagOptions] = useState<string[]>(['Cool', 'Awesome']);
	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState<string | null>(null);

	const navigate = useNavigate();

	const handleChange = (event: SelectChangeEvent<typeof grade>) => {
		const value = event.target.value;
		setGrade(value);
	};

	const handleDelete = (tagToDelete: string) => {
		setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
	};

	const fetchArtPieces = async () => {
		const response = await ArtPieceService.getAllArtPieces();
		setArtPieces(response.data);
	};

	let newArtPiece = {} as IArtPiece;
	const candidateArtPiece = artPieces.find(
		(item) => item.name === artPiece?.name
	);

	const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		if (candidateArtPiece) {
			newArtPiece = candidateArtPiece;
		} else {
			const createdArtPiece = await ArtPieceService.createArtPiece(
				artPiece!.name
			);
			newArtPiece = createdArtPiece.data;
		}

		const response = await api.post(sharedReviewsUrls.REVIEWS_URL, {
			title: title,
			artPiece: newArtPiece._id,
			group: artGroup,
			tags: tags,
			text: text,
			image: image,
			author: user.id,
			grade: grade,
		});

		navigate(AppRoutes.HOME);
		return;
	};

	useEffect(() => {
		fetchArtPieces();
	}, []);

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				m: '5vh auto',
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
			<ImageBlock setImage={setImage} />
			<Autocomplete
				freeSolo={true}
				sx={{width: '100%'}}
				onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
				value={artPiece}
				includeInputInList={true}
				onChange={(event, newValue) => {
					if (typeof newValue === 'string') {
						setArtPiece({
							name: newValue,
						});
					} else if (newValue && newValue.inputValue) {
						setArtPiece({
							name: newValue.inputValue,
						});
					} else {
						setArtPiece(newValue);
					}
				}}
				filterOptions={(options, params) => {
					const filtered = filter(options, params);

					const {inputValue} = params;

					const isExisting = options.some(
						(option) => inputValue === option.name
					);
					if (inputValue !== '' && !isExisting) {
						filtered.push({
							inputValue,
							name: `Add "${inputValue}"`,
						});
					}

					return filtered;
				}}
				selectOnFocus
				clearOnBlur
				options={artPieces}
				isOptionEqualToValue={(option, value) => option.name === value.name}
				getOptionLabel={(option) => {
					if (typeof option === 'string') {
						return option;
					}
					if (option.inputValue) {
						return option.inputValue;
					}
					return option.name;
				}}
				renderOption={(props, option) => <li {...props}>{option.name}</li>}
				renderInput={(params) => (
					<TextField {...params} label="Art piece" color="error" />
				)}
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
				renderInput={(params) => (
					<TextField {...params} label="Art group" color="error" />
				)}
			/>
			<TextareaAutosize
				style={{
					width: '97%',
					padding: '10px',
					fontSize: '18px',
					fontFamily: 'inherit',
					border: '1px solid gray',
					borderRadius: '5px',
				}}
				onChange={(event) => setText(event.target.value)}
				minRows={3}
				placeholder="How do you like it?"
				value={text}
				color="error"
			/>
			<Divider sx={{m: '40px auto', width: '100%'}} />
			<Autocomplete
				onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
				fullWidth
				options={tagOptions}
				isOptionEqualToValue={(option, value) => option === value}
				renderInput={(params) => (
					<TextField {...params} label="Press Enter to add tag" color="error" />
				)}
				placeholder="Add tags"
				value={tag}
				onKeyUp={(e) => {
					const element = e.target as HTMLInputElement;
					const targetValue = element.value;

					if (e.code === 'Enter') {
						setTags((prev) =>
							prev.includes(targetValue) ? prev : [...tags, targetValue]
						);
						setTagOptions((prev) =>
							prev.includes(targetValue) ? prev : [...prev, targetValue]
						);
					}
				}}
			/>
			<Stack sx={{m: '10px auto', width: '100%'}} direction="row" spacing={1}>
				{tags.map((tag) => (
					<Chip key={tag} label={tag} onDelete={() => handleDelete(tag)} />
				))}
			</Stack>
			<InputLabel sx={{m: '10px'}} id="grade-label">
				Your grade
			</InputLabel>
			<Select
				autoWidth
				labelId="grade-label"
				value={grade}
				onChange={handleChange}
				color="error"
			>
				{grades.map((grade) => (
					<MenuItem key={grade} value={grade}>
						{grade}
					</MenuItem>
				))}
			</Select>
			<Divider sx={{m: '40px auto', width: '100%'}} />
			<ButtonOriginal
				extraStyles={{
					m: '20px auto',
					width: '150px',
				}}
				text="create"
				type={ButtonTypes.SUBMIT}
			/>
		</Box>
	);
};
