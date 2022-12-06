import React, {FC} from 'react';

import {Header} from '../Header/Header';
import {Box} from '@mui/material';

import {LayoutProps} from './interface';

export const Layout: FC<LayoutProps> = ({children}) => {
	return (
		<Box>
			<Header />
			{children}
		</Box>
	);
};
