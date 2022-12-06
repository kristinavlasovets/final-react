import axios, {AxiosRequestConfig} from 'axios';

import {API_URL} from '../shared/sharedUrls';

const api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
	config!.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

export default api;
