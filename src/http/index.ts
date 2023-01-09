import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {refreshToken} from '../services/AuthService';

import {API_URL} from '../shared/sharedUrls';

const api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
	config!.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

api.interceptors.response.use(
	(config: AxiosResponse) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				const response = await refreshToken();
				localStorage.setItem('token', response.data.accessToken);

				return api.request(originalRequest);
			} catch (error) {
				console.log('User is not authorized.');
			}
		}
		throw error;
	}
);

export default api;
