import {IArtPiece} from './IArtPiece';
import {IUser} from './IUser';

export interface IReview {
	_id: string;
	author: IUser;
	title: string;
	image: string;
	artPiece: IArtPiece;
	group: string;
	text: string;
	grade: string;
	tags: string[];
	likes: string[];
	creationDate: string;
}
