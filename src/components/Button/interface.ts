export enum ButtonVariants {
	CONTAINED = 'contained',
	OUTLINED = 'outlined',
	TEXT = 'text',
}

export enum ButtonTypes {
	BUTTON = 'button',
	SUBMIT = 'submit',
}

export type ButtonColors =
	| 'inherit'
	| 'primary'
	| 'secondary'
	| 'success'
	| 'error'
	| 'info'
	| 'warning';

export interface ButtonProps {
	text: string;
	onClick?: () => void;
	variant?: ButtonVariants;
	type?: ButtonTypes;
	color?: ButtonColors;
}

export interface ButtonLinkProps extends ButtonProps {
	path: string;
}
