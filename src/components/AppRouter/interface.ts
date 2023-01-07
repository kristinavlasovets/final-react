import React from 'react';

import {HomePage} from '../../pages/HomePage';
import {NetworkSignUpPage} from '../../pages/NetworkSignUpPage';
import {NotFoundPage} from '../../pages/NotFoundPage';
import {ReviewCreatePage} from '../../pages/ReviewCreatePage';
import {ReviewFullPage} from '../../pages/ReviewFullPage';
import {SignInPage} from '../../pages/SignInPage';
import {SignUpPage} from '../../pages/SignUpPage';
import {UserAccountPage} from '../../pages/UserAccountPage';
import {AdminPage} from '../../pages/AdminPage';

export interface IRoute {
	path: string;
	element: React.ComponentType;
}

export enum AppRoutes {
	HOME = '/',
	NOT_FOUND = '*',
	NETWORK_SIGNUP = '/network-signup',
	SIGNUP = '/signup',
	SIGNIN = '/signin',
	REVIEW_CREATE = '/review-create',
	REVIEW_FULL = '/review-full/:id',
	REVIEW_EDIT = '/review-create/:id',
	USER_ACCOUNT = '/user-account',
	USER_ACCOUNT_AS_ADMIN = '/user-account/:id',
	ADMIN_PAGE = '/admin-page',
}

export const publicAppRoutes: IRoute[] = [
	{path: AppRoutes.HOME, element: HomePage},
	{path: AppRoutes.NOT_FOUND, element: NotFoundPage},
	{path: AppRoutes.NETWORK_SIGNUP, element: NetworkSignUpPage},
	{path: AppRoutes.SIGNUP, element: SignUpPage},
	{path: AppRoutes.SIGNIN, element: SignInPage},
	{path: AppRoutes.REVIEW_CREATE, element: ReviewCreatePage},
	{path: AppRoutes.REVIEW_FULL, element: ReviewFullPage},
	{path: AppRoutes.REVIEW_EDIT, element: ReviewCreatePage},
	{path: AppRoutes.USER_ACCOUNT, element: UserAccountPage},
	{path: AppRoutes.USER_ACCOUNT_AS_ADMIN, element: UserAccountPage},
	{path: AppRoutes.ADMIN_PAGE, element: AdminPage},
];
