// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDk2mfyuruKZGiiuLA8pRYbpRb8Lxrit3Q',
	authDomain: 'reminders-6a578.firebaseapp.com',
	projectId: 'reminders-6a578',
	storageBucket: 'reminders-6a578.appspot.com',
	messagingSenderId: '286509330370',
	appId: '1:286509330370:web:f6a64bac3729790401b05b'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
