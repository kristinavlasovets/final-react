import api from '../http';
import {AxiosResponse} from 'axios';
import {IArtPiece} from '../models/IArtPiece';
import {sharedArtPiecesUrls} from '../shared/sharedUrls';

export default class ArtPieceService {
	static createArtPiece(name: string): Promise<AxiosResponse<IArtPiece>> {
		return api.post<IArtPiece>(sharedArtPiecesUrls.NEW_ARTPIECE_URL, {
			name: name,
		});
	}

	static getAllArtPieces(): Promise<AxiosResponse<IArtPiece[]>> {
		return api.get<IArtPiece[]>(sharedArtPiecesUrls.ARTPIECES_URL);
	}
}
