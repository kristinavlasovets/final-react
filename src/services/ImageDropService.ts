import axios from 'axios';

import {IMAGE_DROP_URL} from '../shared/sharedUrls';

type imageDropServiceProps = string | Blob;

export const uploadImage = async (file: imageDropServiceProps) => {
	try {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'mauuttir');

		const response = await axios.post(IMAGE_DROP_URL, formData);

		return response.data;
	} catch (e: any) {
		console.log(e);
	}
};
