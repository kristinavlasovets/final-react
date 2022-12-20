import api from '../http';
import {AxiosResponse} from 'axios';
import {IReview} from '../models/IReview';
import {sharedReviewsUrls} from '../shared/sharedUrls';

interface createReviewInput {
	author: string;
	title: string;
	image: string;
	artPiece: string;
	artGroup: string;
	text: string;
	grade: string;
	tags: string[];
}

export const createReviews = async (
	data: createReviewInput
): Promise<AxiosResponse<IReview>> => {
	const {author, title, image, artPiece, artGroup, text, grade, tags} = data;
	return api.post(sharedReviewsUrls.REVIEWS_URL, {
		author,
		title,
		image,
		artPiece,
		artGroup,
		text,
		grade,
		tags,
	});
};

export const getAllReviews = async (): Promise<AxiosResponse<IReview[]>> => {
	return api.get(sharedReviewsUrls.REVIEWS_URL);
};

export const getExactReview = async (
	id: string
): Promise<AxiosResponse<IReview>> => {
	return api.get(sharedReviewsUrls.REVIEWS_URL + `/${id}`);
};

export const likeReview = async (
	id: string
): Promise<AxiosResponse<IReview>> => {
	return api.post(sharedReviewsUrls.REVIEWS_URL + `/likes/${id}`);
};
