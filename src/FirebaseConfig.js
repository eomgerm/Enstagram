// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5qV7kPIlXkbs5Eyzmwz7S3CwyvXRu6OI",
  authDomain: "enstagram-df020.firebaseapp.com",
  projectId: "enstagram-df020",
  storageBucket: "enstagram-df020.appspot.com",
  messagingSenderId: "454669221708",
  appId: "1:454669221708:web:913277afd64fd23c7919e9",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const authService = getAuth();
export const fsService = getFirestore();
export const storageService = getStorage();
