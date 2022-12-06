import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {publicAppRoutes} from './interface';

export const AppRouter = () => {
	return (
		<Routes>
			{publicAppRoutes.map((route) => (
				<Route path={route.path} element={<route.element />} />
			))}
		</Routes>
	);
};
