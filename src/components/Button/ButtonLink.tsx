import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import {Button} from '@mui/material';

import {ButtonLinkProps, ButtonTypes, ButtonVariants} from './interface';

export const ButtonLink: FC<ButtonLinkProps> = ({
	color = 'error',
	onClick,
	text,
	type = ButtonTypes.BUTTON,
	variant = ButtonVariants.OUTLINED,
	path,
	extraStyles,
}) => {
	return (
		<Link to={path} style={{textDecoration: 'none'}}>
			<Button
				onClick={onClick}
				type={type}
				color={color}
				variant={variant}
				sx={{...extraStyles, fontSize: '16px', fontWeight: 600}}
			>
				{text}
			</Button>
		</Link>
	);
};
