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
			headerName: 'Email',
			width: 150,
		},
		{field: 'status', headerName: 'Status', width: 150},
		{field: 'role', headerName: 'Role', width: 100},
		{field: 'updatedAt', headerName: 'Last update', width: 250},
	];

	// const handleRowClick: GridEventListener<'rowClick'> = (params) => {
	// 	navigate(AppRoutes.USER_ACCOUNT + `/${params.row._id}`);
	// 	return;
	// };

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
					title="User account"
				>
					<RemoveRedEye />
				</IconButton>

				<IconButton onClick={deleteUser} title="Delete user">
					<DeleteIcon />
				</IconButton>

				<IconButton onClick={blockUser} title="Block user">
					<BlockIcon />
				</IconButton>

				<IconButton onClick={unblockUser} title="Unblock user">
					<AddCircleOutlineIcon />
				</IconButton>

				<IconButton onClick={makeAdmin} title="Set as admin">
					<Psychology />
				</IconButton>

				<IconButton onClick={makeUser} title="Set as user">
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
