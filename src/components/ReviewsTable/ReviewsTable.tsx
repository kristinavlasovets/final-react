import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from '../../hooks/redux';
import {useNavigate, useParams} from 'react-router-dom';

import {useTranslation} from 'react-i18next';

import {Box, Card, IconButton, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
	DataGrid,
	GridColDef,
	GridEventListener,
	GridRowId,
	GridValueGetterParams,
} from '@mui/x-data-grid';
import {IReview} from '../../models/IReview';
import {
	deleteExactReview,
	getReviewsByUser,
} from '../../services/ReviewService';
import {ReviewCard} from '../ReviewCard/ReviewCard';
import {AppRoutes} from '../AppRouter/interface';
import {ReviewsTableProps} from './interface';

export const ReviewsTable: FC<ReviewsTableProps> = () => {
	const [reviewsByUser, setReviewsByUser] = useState<IReview[]>([]);
	const [arrIds, setArrIds] = useState<GridRowId[]>([]);

	const {user, isAdmin} = useAppSelector((state) => state.authReducer);
	const navigate = useNavigate();

	const {t} = useTranslation();

	const {id} = useParams();

	const fetchMyReviews = async () => {
		const byUser = await getReviewsByUser(isAdmin ? id! : user.id!);
		setReviewsByUser(byUser.data);
	};

	const deleteReview = async (id: string | GridRowId) => {
		const response = await deleteExactReview(id);
		setReviewsByUser((prev) => prev.filter((item) => item._id !== id));
	};

	const deleteTableReview = async () => {
		arrIds.forEach((id) => deleteReview(id));
	};

	useEffect(() => {
		fetchMyReviews();
	}, [reviewsByUser]);

	const columns: GridColDef[] = [
		{field: '_id', headerName: 'ID', width: 200},
		{
			field: 'author',
			headerName: `${t('Table.0')}`,
			width: 100,
			valueGetter: (params: GridValueGetterParams) =>
				`${params.row.author.email}`,
		},
		{field: 'title', headerName: `${t('Table.1')}`, width: 150},
		{
			field: 'artPiece',
			headerName: `${t('Table.2')}`,
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				`${params.row.artPiece.name}`,
		},
		{field: 'artGroup', headerName: `${t('Table.3')}`, width: 100},
		{field: 'text', headerName: `${t('Table.4')}`, width: 250},
		{field: 'grade', headerName: `${t('Table.5')}`, width: 100},
	];

	const handleRowClick: GridEventListener<'rowClick'> = (params) => {
		navigate(AppRoutes.HOME + 'review-full' + `/${params.row._id}`);
		return;
	};
	return (
		<Box>
			<Typography
				sx={{
					m: '40px auto',
					width: '100%',
					textAlign: 'center',
					fontSize: '18px',
				}}
			>
				{t('Table.title')}
			</Typography>
			<Card
				sx={{
					m: '20px auto',
					p: '20px 20px 0 20px',
					width: '80vw',
					maxWidth: '80vw',
					height: 'fit-content',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-evenly',
				}}
			>
				{reviewsByUser.map((review) => (
					<ReviewCard
						review={review}
						key={review._id}
						isFull={false}
						isMine={true}
						setReviews={setReviewsByUser}
						deleteReview={() => deleteReview(review._id)}
					/>
				))}
			</Card>

			<Box
				sx={{
					m: '20px auto',
					width: '80vw',
					maxWidth: '80vw',
					height: 400,
				}}
			>
				<Box
					sx={{
						m: '40px 0 20px 20px',
						display: 'flex',
						justifyContent: 'flex-start',
					}}
				>
					<IconButton onClick={deleteTableReview}>
						<DeleteIcon />
					</IconButton>

					<IconButton
						onClick={() =>
							navigate(AppRoutes.HOME + 'review-create' + `/${arrIds[0]}`)
						}
					>
						<ModeEditIcon fontSize="small" />
					</IconButton>
				</Box>
				<DataGrid
					sx={{p: '0 20px 0 20px'}}
					getRowId={(row) => row._id}
					rows={reviewsByUser}
					onRowClick={handleRowClick}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					checkboxSelection
					disableSelectionOnClick
					onSelectionModelChange={(ids) => {
						setArrIds(ids);
					}}
				/>
			</Box>
		</Box>
	);
};
