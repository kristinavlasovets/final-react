import api from '../http';
import axios, {AxiosResponse} from 'axios';
import {AuthResponse} from '../models/response/AuthResponse';
import {API_URL, sharedAuthUrls} from '../shared/sharedUrls';

export interface registrationInput {
	email: string;
	password: string;
}

export default class AuthService {
	static async registration(
		data: registrationInput
	): Promise<AxiosResponse<AuthResponse>> {
		const {email, password} = data;
		return api.post(API_URL + sharedAuthUrls.REGISTER_URL, {email, password});
	}

	static async loginViaSocial(): Promise<AxiosResponse<AuthResponse>> {
		return api.get(sharedAuthUrls.LOGIN_SOCIAL_URL);
	}
	static async login(
		data: registrationInput
	): Promise<AxiosResponse<AuthResponse>> {
		const {email, password} = data;
		return api.post(sharedAuthUrls.LOGIN_URL, {email, password});
	}

	static async logout(): Promise<void> {
		return api.post(sharedAuthUrls.LOGOUT_URL);
	}
}
export const refreshToken = async (): Promise<AxiosResponse<AuthResponse>> => {
	return axios.get(
		process.env.REACT_APP_SERVER_URL + sharedAuthUrls.REFRESH_TOKEN,
		{
			withCredentials: true,
		}
	);
};
