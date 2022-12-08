import React, {FC} from 'react';

import {AppRouter} from './components/AppRouter/AppRouter';
import {Layout} from './Layout/Layout';

export const App: FC = () => {
	return (
		<Layout>
			<AppRouter />
		</Layout>
	);
};
