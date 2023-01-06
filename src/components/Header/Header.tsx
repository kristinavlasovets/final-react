import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {logoutThunk} from '../../redux/reducers/auth/thunks/logoutThunk';
import {setMode} from '../../redux/reducers/auth/AuthSlice';

import {useTheme} from '@mui/material/styles';

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

	const handleTheme = () => {
		dispatch(setMode());
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
							<Button>en</Button>
							<Button>ru</Button>
						</ButtonGroup>

						<SearchIcon />
						<InputBase
							placeholder="Search…"
							inputProps={{'aria-label': 'search'}}
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
								text="sign in"
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

						<Tooltip title="Account settings">
							<IconButton
								onClick={handleClick}
								size="small"
								sx={{ml: '5px'}}
								aria-controls={open ? 'account-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
							>
								<Avatar sx={{width: 32, height: 32}}>U</Avatar>
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
									text="My Account"
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
									text="Create a review"
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
									Sign out
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
