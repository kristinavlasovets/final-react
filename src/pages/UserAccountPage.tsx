import React, {FC} from 'react';
import {useAppSelector} from '../hooks/redux';
import {Navigate} from 'react-router-dom';
import {AppRoutes} from '../components/AppRouter/interface';
import {ReviewsTable} from '../components/ReviewsTable/ReviewsTable';

export const UserAccountPage: FC = () => {
	const {isAuth} = useAppSelector((state) => state.authReducer);

	return isAuth ? <ReviewsTable /> : <Navigate to={AppRoutes.SIGNIN} />;
};
