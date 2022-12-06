import React from 'react';

import {HomePage} from '../../pages/HomePage';
import {NetworkSignUpPage} from '../../pages/NetworkSignUpPage';
import {NotFoundPage} from '../../pages/NotFoundPage';
import {SignInPage} from '../../pages/SignInPage';
import {SignUpPage} from '../../pages/SignUpPage';

export interface IRoute {
	path: string;
	element: React.ComponentType;
}

export enum AppRoutes {
	HOME = '/',
	NOT_FOUND = '*',
	NETWORK_SIGNUP = '/network_signup',
	SIGNUP = '/signup',
	SIGNIN = '/signin',
}

export const publicAppRoutes: IRoute[] = [
	{path: AppRoutes.HOME, element: HomePage},
	{path: AppRoutes.NOT_FOUND, element: NotFoundPage},
	{path: AppRoutes.NETWORK_SIGNUP, element: NetworkSignUpPage},
	{path: AppRoutes.SIGNUP, element: SignUpPage},
	{path: AppRoutes.SIGNIN, element: SignInPage},
];
