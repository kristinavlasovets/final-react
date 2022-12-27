import React, {FC, useMemo} from 'react';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import {themeSettings} from './theme';
import {RootState} from '../src/redux/store';

import {AppRouter} from './components/AppRouter/AppRouter';
import {Layout} from './Layout/Layout';

export const App: FC = () => {
	const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
	const mode = useAppSelector((state) => state.authReducer.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Layout>
				<AppRouter />
			</Layout>
		</ThemeProvider>
	);
};
