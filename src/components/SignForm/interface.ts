import {registrationInput} from '../../services/AuthService';

type signFormSubmit = (data: registrationInput) => void | undefined;

export interface SignFormProps {
	isSignup?: boolean;
	signFormSubmit: signFormSubmit;
}

export type FormData = {
	email: string;
	password: string;
};
