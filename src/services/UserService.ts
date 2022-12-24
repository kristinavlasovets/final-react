import api from '../http';
import {AxiosResponse} from 'axios';
import {IUser} from '../models/IUser';
import {sharedLikesUrls} from '../shared/sharedUrls';

export default class UserService {
	static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return api.get<IUser[]>('/users');
	}
}

export const likeReview = async (
	id: string,
	userId: string
): Promise<AxiosResponse<IUser[]>> => {
	return api.patch(sharedLikesUrls.LIKES_URL + `/${id}`, {
		userId: userId,
	});
};
