import React, {ChangeEvent, useState} from 'react';
import ReactMarkdown from 'react-markdown';

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
import {useAppSelector} from '../../hooks/redux';
import api from '../../http';
import {sharedArtPiecesUrls, sharedReviewsUrls} from '../../shared/sharedUrls';
import {IArtPiece} from '../../models/IArtPiece';
import {ImageBlock} from '../ImageBlock/ImageBlock';

const filter = createFilterOptions<FilmOptionType>();

export const ReviewCreateForm = () => {
	const artGroupOptions = ['Books', 'Games', 'Movies'];
	const grades = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
	const {user} = useAppSelector((state) => state.authReducer);

	const [title, setTitle] = useState<string>('');
	const [artPiece, setArtPiece] = useState<FilmOptionType | null>(null);
	const [artPieces, setArtPieces] = useState<IArtPiece[]>([{name: 'Grinch'}]);
	const [artGroup, setArtGroup] = useState<string | null>(null);
	const [text, setText] = useState<string>('');
	const [grade, setGrade] = useState<string>('');
	const [tagOptions, setTagOptions] = useState<string[]>(['Cool', 'Awesome']);
	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState<string | null>(null);

	const handleChange = (event: SelectChangeEvent<typeof grade>) => {
		const value = event.target.value;
		setGrade(value);
	};

	const handleDelete = (tagToDelete: string) => {
		setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
	};

	const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		console.log('post request');
		console.log(title);
		console.log(artPiece);
		console.log(artGroup);
		console.log(tags);
		console.log(text);
		console.log(user.id);
		console.log(grade);
		const response = await api.post(sharedReviewsUrls.REVIEWS_URL, {
			title: title,
			artPiece: artPiece,
			group: artGroup,
			tags: tags,
			text: text,
			image: '',
			author: user.id,
			grade: grade,
		});
	};

	const handleArtPieces = async () => {
		const response = await api.post(sharedArtPiecesUrls.ARTPIECES_URL, {
			name: artPiece,
		});
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
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
			<ImageBlock />
			<Autocomplete
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
					// Suggest the creation of a new value
					const isExisting = options.some(
						(option) => inputValue === option.name
					);
					if (inputValue !== '' && !isExisting) {
						filtered.push({
							inputValue,
							name: `Add "${inputValue}"`,
						});
						// setArtPieces((prev) => [...prev, {name: inputValue}]);
					}

					return filtered;
				}}
				selectOnFocus
				clearOnBlur
				options={artPieces}
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
				sx={{width: '100%'}}
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
			<ReactMarkdown children={text} />

			<Divider sx={{m: '40px auto', width: '100%'}} />

			<Autocomplete
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

interface FilmOptionType {
	inputValue?: string;
	name: string;
}
