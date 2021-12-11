// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBKVKRlPqY0t94Tzt7e8kCvGuLe7S6jmHI',
	authDomain: 'enstagram-bf0bd.firebaseapp.com',
	projectId: 'enstagram-bf0bd',
	storageBucket: 'enstagram-bf0bd.appspot.com',
	messagingSenderId: '7849623581',
	appId: '1:7849623581:web:753b48457953ac577b86f4',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const authService = getAuth();
export const fsService = getFirestore();
export const storageService = getStorage();