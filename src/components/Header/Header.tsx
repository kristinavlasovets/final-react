import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {logoutThunk} from '../../redux/reducers/auth/thunks/logoutThunk';
import {setMode} from '../../redux/reducers/auth/AuthSlice';

import {useTheme} from '@mui/material/styles';
import {useTranslation} from 'react-i18next';

import {
	AppBar,
	Box,
	Avatar,
	Toolbar,
	IconButton,
	InputBase,
	MenuItem,
	Menu,
	ListItemIcon,
	Tooltip,
	ButtonGroup,
	Button,
	TextField,
	InputAdornment,
} from '@mui/material';

import {
	DarkMode,
	LightMode,
	DocumentScanner,
	Logout,
	Person,
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

import {ButtonLink} from '../Button/ButtonLink';
import {AppRoutes} from '../AppRouter/interface';
import {ButtonVariants} from '../Button/interface';

export const Header: FC = () => {
	const theme = useTheme();
	const {t, i18n} = useTranslation();

	const handleTheme = () => {
		dispatch(setMode());
	};
	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language);
	};

	const {isAuth} = useAppSelector((state) => state.authReducer);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useAppDispatch();
	const signout = () => {
		dispatch(logoutThunk());
	};

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position="static" color="transparent">
				<Toolbar>
					<ButtonLink
						extraStyles={{
							width: {xs: '80px', md: '150px'},
							height: {xs: '35px', md: '50px'},
							mr: '5px',
						}}
						text="ROTTEN"
						path={AppRoutes.HOME}
						variant={ButtonVariants.TEXT}
					/>

					<Box
						sx={{
							padding: '5px',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<ButtonGroup variant="text" color="error" size="small">
							<Button onClick={() => changeLanguage('en')}>en</Button>
							<Button onClick={() => changeLanguage('ru')}>ru</Button>
						</ButtonGroup>

						<TextField
							sx={{
								ml: {xs: '5px', md: '25px'},
								width: {xs: '100px', md: '230px'},
							}}
							placeholder={`${t('Search.placeholder')}`}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
							color="error"
							variant="standard"
						/>
					</Box>

					<Box sx={{flexGrow: 1}} />
					<Box sx={{display: 'flex'}}>
						{!isAuth && (
							<ButtonLink
								extraStyles={{
									width: {xs: '60px', md: '100px'},
									height: '35px',
									m: '3px 5px 0 0',
									lineHeight: '16px',
								}}
								text={t('Menu.signin')}
								path={AppRoutes.SIGNIN}
								variant={ButtonVariants.CONTAINED}
							/>
						)}

						<IconButton onClick={handleTheme}>
							{theme.palette.mode === 'dark' ? (
								<DarkMode sx={{fontSize: '25px'}} />
							) : (
								<LightMode sx={{fontSize: '25px'}} />
							)}
						</IconButton>

						<Tooltip title={t('Menu.label')}>
							<IconButton
								onClick={handleClick}
								size="small"
								sx={{ml: '5px'}}
								aria-controls={open ? 'account-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
							>
								<Avatar sx={{width: 32, height: 32}}>{t('Menu.title')}</Avatar>
							</IconButton>
						</Tooltip>

						<Menu
							anchorEl={anchorEl}
							id="account-menu"
							open={open}
							onClose={handleClose}
							onClick={handleClose}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: 'visible',
									filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
									mt: 1.5,
									'& .MuiAvatar-root': {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1,
									},
									'&:before': {
										content: '""',
										display: 'block',
										position: 'absolute',
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: 'background.paper',
										transform: 'translateY(-50%) rotate(45deg)',
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{horizontal: 'right', vertical: 'top'}}
							anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
						>
							<MenuItem>
								<Person fontSize="small" />
								<ButtonLink
									extraStyles={{
										width: '100%',
										height: '20px',
									}}
									text={t('Menu.0')}
									path={
										isAuth ? `${AppRoutes.USER_ACCOUNT}` : `${AppRoutes.SIGNIN}`
									}
									variant={ButtonVariants.TEXT}
								/>
							</MenuItem>

							<MenuItem>
								<DocumentScanner fontSize="small" />
								<ButtonLink
									extraStyles={{
										width: '100%',
										height: '20px',
									}}
									text={t('Menu.1')}
									path={
										isAuth
											? `${AppRoutes.REVIEW_CREATE}`
											: `${AppRoutes.SIGNIN}`
									}
									variant={ButtonVariants.TEXT}
								/>
							</MenuItem>
							{isAuth ? (
								<MenuItem onClick={signout}>
									<ListItemIcon>
										<Logout fontSize="small" />
									</ListItemIcon>
									{t('Menu.2')}
								</MenuItem>
							) : (
								''
							)}
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
