import api from '../http';
import {AxiosResponse} from 'axios';
import {IComment} from '../models/IComment';
import {sharedReviewsUrls} from '../shared/sharedUrls';

interface createCommentInput {
	name: string;
	userId: string;
	reviewId: string;
	desc: string;
}

export const createComment = async (
	data: createCommentInput
): Promise<AxiosResponse<IComment>> => {
	const {name, userId, reviewId, desc} = data;
	return api.post(sharedReviewsUrls.COMMENTS_URL, {
		name,
		userId,
		reviewId,
		desc,
	});
};

export const getComments = async (
	id: string
): Promise<AxiosResponse<IComment[]>> => {
	return api.get(sharedReviewsUrls.COMMENTS_URL + `/${id}`);
};
