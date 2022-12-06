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
}) => {
	return (
		<Link to={path}>
			<Button onClick={onClick} type={type} color={color} variant={variant}>
				{text}
			</Button>
		</Link>
	);
};
