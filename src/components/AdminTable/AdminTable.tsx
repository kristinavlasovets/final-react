import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {useTranslation} from 'react-i18next';

import {Box, IconButton} from '@mui/material';
import {Psychology, PsychologyAlt, RemoveRedEye} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
	DataGrid,
	GridColDef,
	GridEventListener,
	GridRowId,
} from '@mui/x-data-grid';
import {IUser} from '../../models/IUser';
import {
	fetchUsers,
	deleteExactUser,
	blockExactUser,
	unblockExactUser,
	makeAdminExactUser,
	makeUserExactAdmin,
} from '../../services/UserService';
import {AppRoutes} from '../AppRouter/interface';
import {AdminTableProps} from './interface';

export const AdminTable: FC<AdminTableProps> = () => {
	const [allUsers, setAllUsers] = useState<IUser[]>([]);
	const [arrIds, setArrIds] = useState<GridRowId[]>([]);

	const navigate = useNavigate();

	const {t} = useTranslation();

	const fetchAllUsers = async () => {
		const users = await fetchUsers();
		setAllUsers(users.data);
	};

	const deleteOneUser = async (id: string | GridRowId) => {
		const response = await deleteExactUser(id);
		setAllUsers((prev) => prev.filter((item) => item._id !== id));
	};
	const blockOneUser = async (id: string | GridRowId) => {
		const response = await blockExactUser(id);
		setAllUsers(
			allUsers.map((user) =>
				user._id === id ? {...user, status: 'blocked'} : user
			)
		);
	};
	const unblockOneUser = async (id: string | GridRowId) => {
		const response = await unblockExactUser(id);
		setAllUsers(
			allUsers.map((user) =>
				user._id === id ? {...user, status: 'active'} : user
			)
		);
	};
	const makeAdminOneUser = async (id: string | GridRowId) => {
		const response = await makeAdminExactUser(id);
		setAllUsers(
			allUsers.map((user) =>
				user._id === id ? {...user, role: 'admin'} : user
			)
		);
	};
	const makeUserOneAdmin = async (id: string | GridRowId) => {
		const response = await makeUserExactAdmin(id);
		setAllUsers(
			allUsers.map((user) => (user._id === id ? {...user, role: 'user'} : user))
		);
	};

	const deleteUser = async () => {
		arrIds.forEach((id) => deleteOneUser(id));
	};
	const blockUser = async () => {
		arrIds.forEach((id) => blockOneUser(id));
	};
	const unblockUser = async () => {
		arrIds.forEach((id) => unblockOneUser(id));
	};
	const makeAdmin = async () => {
		arrIds.forEach((id) => makeAdminOneUser(id));
	};
	const makeUser = async () => {
		arrIds.forEach((id) => makeUserOneAdmin(id));
	};

	useEffect(() => {
		fetchAllUsers();
	}, []);

	const columns: GridColDef[] = [
		{field: '_id', headerName: 'ID', width: 100},
		{
			field: 'email',
			headerName: `${t('AdminTable.0')}`,
			width: 150,
		},
		{field: 'status', headerName: `${t('AdminTable.1')}`, width: 150},
		{field: 'role', headerName: `${t('AdminTable.2')}`, width: 100},
		{field: 'updatedAt', headerName: `${t('AdminTable.3')}`, width: 250},
	];

	return (
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
				<IconButton
					onClick={() => navigate(AppRoutes.USER_ACCOUNT + `/${arrIds[0]}`)}
					title={`${t('AdminTable.4')}`}
				>
					<RemoveRedEye />
				</IconButton>

				<IconButton onClick={deleteUser} title={`${t('AdminTable.5')}`}>
					<DeleteIcon />
				</IconButton>

				<IconButton onClick={blockUser} title={`${t('AdminTable.5')}`}>
					<BlockIcon />
				</IconButton>

				<IconButton onClick={unblockUser} title={`${t('AdminTable.6')}`}>
					<AddCircleOutlineIcon />
				</IconButton>

				<IconButton onClick={makeAdmin} title={`${t('AdminTable.7')}`}>
					<Psychology />
				</IconButton>

				<IconButton onClick={makeUser} title={`${t('AdminTable.8')}`}>
					<PsychologyAlt />
				</IconButton>
			</Box>
			<DataGrid
				sx={{p: '0 20px 0 20px'}}
				getRowId={(row) => row._id}
				rows={allUsers}
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
	);
};
