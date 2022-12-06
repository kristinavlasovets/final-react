import React, {FC} from 'react';

import {AppRouter} from './components/AppRouter/AppRouter';
import {Layout} from './components/Layout/Layout';

export const App: FC = () => {
	return (
		<Layout>
			<AppRouter />
		</Layout>
	);
};
