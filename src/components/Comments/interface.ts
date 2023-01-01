import {IComment} from '../../models/IComment';

export interface CommentProps {
	name?: string;
	userId: string;
	text: string;
}
