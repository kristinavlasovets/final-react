import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {logoutThunk} from '../../redux/reducers/auth/thunks/logoutThunk';
import {setMode, setAdmin} from '../../redux/reducers/auth/AuthSlice';

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
	Autocomplete,
} from '@mui/material';

import {
	DarkMode,
	LightMode,
	DocumentScanner,
	Logout,
	Person,
	Psychology,
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

import {ButtonLink} from '../Button/ButtonLink';
import {AppRoutes} from '../AppRouter/interface';
import {ButtonVariants} from '../Button/interface';
import {IReview} from '../../models/IReview';
import {getReviewsBySearch} from '../../services/ReviewService';
import {useNavigate} from 'react-router-dom';

export const Header: FC = () => {
	const [search, setSearch] = useState<string>('');
	const [reviewsBySearch, setReviewsBySearch] = useState<IReview[]>([]);
	const theme = useTheme();
	const {t, i18n} = useTranslation();

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language);
	};

	const {isAuth, isAdmin} = useAppSelector((state) => state.authReducer);

	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useAppDispatch();

	dispatch(setAdmin());

	const signout = () => {
		dispatch(logoutThunk());
	};

	const handleTheme = () => {
		dispatch(setMode());
	};

	const handleSearch = async () => {
		const response = await getReviewsBySearch(search);
		console.log(response.data);
		setReviewsBySearch(response.data);
		setSearch('');
		navigate(AppRoutes.REVIEWS_BY_SEARCH, {state: response.data});
	};

	return (
		<Box>
			<AppBar position="static" color="transparent">
				<Toolbar>
					<ButtonLink
						extraStyles={{
							width: {xs: '70px', md: '150px'},
							height: {xs: '35px', md: '50px'},
						}}
						text="ROTTEN"
						path={AppRoutes.HOME}
						variant={ButtonVariants.TEXT}
					/>

					<Box>
						<ButtonGroup variant="text" color="error" size="small">
							<Button onClick={() => changeLanguage('en')}>en</Button>
							<Button onClick={() => changeLanguage('ru')}>ru</Button>
						</ButtonGroup>

						<TextField
							sx={{
								ml: {xs: '5px', md: '25px'},
								width: {xs: '100px', md: '230px'},
							}}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder={`${t('Search.placeholder')}`}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon onClick={handleSearch} />
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

						{isAuth ? (
							<>
								<Tooltip title={t('Menu.label')}>
									<IconButton
										onClick={handleClick}
										size="small"
										sx={{ml: '5px'}}
										aria-controls={open ? 'account-menu' : undefined}
										aria-haspopup="true"
										aria-expanded={open ? 'true' : undefined}
									>
										<Avatar sx={{width: 32, height: 32}}>
											{isAdmin ? 'A' : `${t('Menu.title')}`}
										</Avatar>
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
									{isAdmin ? (
										<MenuItem>
											<Psychology fontSize="small" />
											<ButtonLink
												extraStyles={{
													width: '100%',
													height: '20px',
												}}
												text={t('Menu.3')}
												path={AppRoutes.ADMIN_PAGE}
												variant={ButtonVariants.TEXT}
											/>
										</MenuItem>
									) : (
										''
									)}

									<MenuItem>
										<Person fontSize="small" />
										<ButtonLink
											extraStyles={{
												width: '100%',
												height: '20px',
											}}
											text={t('Menu.0')}
											path={
												isAuth
													? `${AppRoutes.USER_ACCOUNT}`
													: `${AppRoutes.SIGNIN}`
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
									<MenuItem onClick={signout}>
										<ListItemIcon>
											<Logout fontSize="small" />
										</ListItemIcon>
										{t('Menu.2')}
									</MenuItem>
								</Menu>
							</>
						) : (
							''
						)}
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
