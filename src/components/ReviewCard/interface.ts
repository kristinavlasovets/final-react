import {Dispatch, SetStateAction} from 'react';
import {IReview} from '../../models/IReview';

export interface ReviewCardProps {
	review: IReview;
	isFull?: boolean;
	isMine?: boolean;
	setReviews?: Dispatch<SetStateAction<IReview[]>>;
	deleteReview?: () => Promise<void>;
	handleFullLike?: () => void;
}
