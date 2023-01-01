import React, {FC} from 'react';

import {styled, alpha, useTheme} from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import {ButtonLink} from '../Button/ButtonLink';
import {AppRoutes} from '../AppRouter/interface';
import {ButtonVariants} from '../Button/interface';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {logoutThunk} from '../../redux/reducers/auth/thunks/logoutThunk';
import {DarkMode, LightMode} from '@mui/icons-material';
import {setMode} from '../../redux/reducers/auth/AuthSlice';

export const Header: FC = () => {
	const theme = useTheme();

	const handleTheme = () => {
		dispatch(setMode());
	};

	const Search = styled('div')(({theme}) => ({
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	}));

	const SearchIconWrapper = styled('div')(({theme}) => ({
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}));

	const StyledInputBase = styled(InputBase)(({theme}) => ({
		color: 'inherit',
		'& .MuiInputBase-input': {
			padding: theme.spacing(1, 1, 1, 0),
			paddingLeft: `calc(1em + ${theme.spacing(4)})`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: '20ch',
			},
		},
	}));

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
							width: '150px',
							height: '50px',
						}}
						text="ROTTEN"
						path={AppRoutes.HOME}
						variant={ButtonVariants.TEXT}
					/>

					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{'aria-label': 'search'}}
						/>
					</Search>

					<Box sx={{flexGrow: 1}} />
					<Box sx={{display: {xs: 'none', md: 'flex'}}}>
						{!isAuth && (
							<ButtonLink
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
								sx={{ml: 2}}
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
								<Avatar /> Profile
							</MenuItem>
							<MenuItem>
								<Avatar /> My account
							</MenuItem>

							<MenuItem>
								<PersonAdd fontSize="small" />
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
							<Divider />
							<MenuItem>
								<ListItemIcon>
									<Settings fontSize="small" />
								</ListItemIcon>
								Settings
							</MenuItem>
							<MenuItem onClick={signout}>
								<ListItemIcon>
									<Logout fontSize="small" />
								</ListItemIcon>
								Sign out
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
