import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from '../../hooks/redux';
import {useNavigate} from 'react-router-dom';

import {Box, Card, IconButton, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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
import {ButtonVariants} from '../Button/interface';
import {ButtonLink} from '../Button/ButtonLink';
import {ReviewsTableProps} from './interface';

export const ReviewsTable: FC<ReviewsTableProps> = () => {
	const [reviewsByUser, setReviewsByUser] = useState<IReview[]>([]);
	const [arrIds, setArrIds] = useState<GridRowId[]>([]);

	const {user} = useAppSelector((state) => state.authReducer);
	const navigate = useNavigate();

	const fetchMyReviews = async () => {
		const byUser = await getReviewsByUser(user.id);
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
			headerName: 'Author',
			width: 150,
			valueGetter: (params: GridValueGetterParams) =>
				`${params.row.author.email}`,
		},
		{field: 'title', headerName: 'Title', width: 150},
		{
			field: 'artPiece',
			headerName: 'Art piece',
			width: 100,
			valueGetter: (params: GridValueGetterParams) =>
				`${params.row.artPiece.name}`,
		},
		{field: 'artGroup', headerName: 'Art group', width: 100},
		{field: 'text', headerName: 'Text', width: 250},
		{field: 'grade', headerName: 'Grade', width: 50},
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
				My REVIEWS
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

					<ButtonLink
						extraStyles={{height: '35px'}}
						text="edit"
						path={AppRoutes.HOME + 'review-create'}
						variant={ButtonVariants.TEXT}
					/>
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
