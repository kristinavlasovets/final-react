import api from '../http';
import {AxiosResponse} from 'axios';
import {IArtPiece} from '../models/IArtPiece';
import {sharedArtPiecesUrls} from '../shared/sharedUrls';

export const createArtPiece = async (
	name: string
): Promise<AxiosResponse<IArtPiece>> => {
	return api.post<IArtPiece>(sharedArtPiecesUrls.NEW_ARTPIECE_URL, {
		name: name,
	});
};

export const getAllArtPieces = async (): Promise<
	AxiosResponse<IArtPiece[]>
> => {
	return api.get<IArtPiece[]>(sharedArtPiecesUrls.ARTPIECES_URL);
};
export const rateArtPieces = async (
	star: number,
	artPieceId: string,
	userId: string
): Promise<AxiosResponse<IArtPiece>> => {
	return api.put<IArtPiece>(sharedArtPiecesUrls.ARTPIECES_RATING_URL, {
		star,
		artPieceId,
		userId,
	});
};
