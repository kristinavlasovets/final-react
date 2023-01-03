import api from '../http';
import {AxiosResponse} from 'axios';
import {IReview} from '../models/IReview';
import {sharedReviewsUrls} from '../shared/sharedUrls';

interface createReviewInput {
	author: string;
	title: string;
	image: string;
	artPiece: string;
	artGroup: string | null;
	text: string;
	grade: string;
	tags: string[];
}

export const createReviews = async (
	data: createReviewInput
): Promise<AxiosResponse<IReview>> => {
	const {author, title, image, artPiece, artGroup, text, grade, tags} = data;
	return api.post(sharedReviewsUrls.REVIEWS_URL, {
		title,
		artPiece,
		artGroup,
		tags,
		text,
		image,
		author,
		grade,
	});
};
export const updateReviews = async (
	id: string,
	data: createReviewInput
): Promise<AxiosResponse<IReview>> => {
	const {author, title, image, artPiece, artGroup, text, grade, tags} = data;
	return api.patch(sharedReviewsUrls.REVIEWS_URL + `/${id}`, {
		title,
		artPiece,
		artGroup,
		tags,
		text,
		image,
		author,
		grade,
	});
};

export const getAllReviews = async (): Promise<AxiosResponse<IReview[]>> => {
	return api.get(sharedReviewsUrls.REVIEWS_URL);
};
export const getAllTags = async (): Promise<AxiosResponse<string[]>> => {
	return api.get(sharedReviewsUrls.ALL_TAGS_URL);
};

export const getMostRatedReviews = async (): Promise<
	AxiosResponse<IReview[]>
> => {
	return api.get(sharedReviewsUrls.MOST_RATED_REVIEWS_URL);
};

export const getMostRecentReviews = async (): Promise<
	AxiosResponse<IReview[]>
> => {
	return api.get(sharedReviewsUrls.MOST_RECENT_REVIEWS_URL);
};
export const getReviewsByTag = async (
	tag: string
): Promise<AxiosResponse<IReview[]>> => {
	return api.get(sharedReviewsUrls.BY_TAG_REVIEWS_URL + `/${tag}`);
};
export const getReviewsByUser = async (
	userId: string
): Promise<AxiosResponse<IReview[]>> => {
	return api.get(sharedReviewsUrls.BY_USER_REVIEWS_URL + `/${userId}`);
};

export const getExactReview = async (
	id: string
): Promise<AxiosResponse<IReview>> => {
	return api.get(sharedReviewsUrls.REVIEWS_URL + `/${id}`);
};
export const deleteExactReview = async (
	id: string
): Promise<AxiosResponse<IReview>> => {
	return api.delete(sharedReviewsUrls.REVIEWS_URL + `/${id}`);
};

export const getRelatedReviews = async (): Promise<
	AxiosResponse<IReview[]>
> => {
	return api.get(sharedReviewsUrls.REVIEWS_URL);
};
