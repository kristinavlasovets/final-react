// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: 'final-8d391.firebaseapp.com',
	projectId: 'final-8d391',
	storageBucket: 'final-8d391.appspot.com',
	messagingSenderId: '721891747474',
	appId: '1:721891747474:web:a67f989ebc4cd1c53fe84b',
	measurementId: 'G-089L3DZSDD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
