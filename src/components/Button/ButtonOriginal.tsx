import React, {FC} from 'react';
import {Button} from '@mui/material';
import {ButtonProps, ButtonTypes, ButtonVariants} from './interface';

export const ButtonOriginal: FC<ButtonProps> = ({
	color = 'error',
	onClick,
	text,
	type = ButtonTypes.BUTTON,
	variant = ButtonVariants.OUTLINED,
}) => {
	return (
		<Button onClick={onClick} type={type} color={color} variant={variant}>
			{text}
		</Button>
	);
};
