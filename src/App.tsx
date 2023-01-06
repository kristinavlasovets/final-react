import React, {FC, Suspense, useMemo} from 'react';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {Box, CssBaseline, ThemeProvider} from '@mui/material';
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
			<Suspense
				fallback={
					<Box
						sx={{
							width: '100%',
							m: '45vh auto',
							display: 'flex',
							justifyContent: 'center',
							fontSize: '22px',
						}}
					>
						Loading...
					</Box>
				}
			>
				<Layout>
					<AppRouter />
				</Layout>
			</Suspense>
		</ThemeProvider>
	);
};
