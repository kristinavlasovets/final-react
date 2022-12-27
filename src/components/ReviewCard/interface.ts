import {Dispatch, SetStateAction} from 'react';
import {IReview} from '../../models/IReview';

export interface ReviewCardProps {
	review: IReview;
	isFull?: boolean;
	setReviews?: Dispatch<SetStateAction<IReview[]>>;
	handleFullLike?: () => void;
}
