import api from '../http';
import {AxiosResponse} from 'axios';
import {IUser} from '../models/IUser';
import {sharedLikesUrls, sharedUserUrls} from '../shared/sharedUrls';
import {GridRowId} from '@mui/x-data-grid';

export const fetchUsers = async (): Promise<AxiosResponse<IUser[]>> => {
	return api.get<IUser[]>('/users');
};

export const deleteExactUser = async (
	id: string | GridRowId
): Promise<AxiosResponse<IUser>> => {
	return api.delete(sharedUserUrls.USERS_URL + `/${id}`);
};
export const blockExactUser = async (
	id: string | GridRowId
): Promise<AxiosResponse<IUser>> => {
	return api.patch(sharedUserUrls.USERS_URL + '/block' + `/${id}`);
};
export const unblockExactUser = async (
	id: string | GridRowId
): Promise<AxiosResponse<IUser>> => {
	return api.patch(sharedUserUrls.USERS_URL + '/unblock' + `/${id}`);
};
export const makeAdminExactUser = async (
	id: string | GridRowId
): Promise<AxiosResponse<IUser>> => {
	return api.patch(sharedUserUrls.USERS_URL + '/make-admin' + `/${id}`);
};
export const makeUserExactAdmin = async (
	id: string | GridRowId
): Promise<AxiosResponse<IUser>> => {
	return api.patch(sharedUserUrls.USERS_URL + '/make-user' + `/${id}`);
};

export const likeReview = async (
	id: string,
	userId: string
): Promise<AxiosResponse<IUser[]>> => {
	return api.patch(sharedLikesUrls.LIKES_URL + `/${id}`, {
		userId: userId,
	});
};
