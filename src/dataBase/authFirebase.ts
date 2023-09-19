// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCB5Dlto5DLQd__hi1gE4ir8jnxKFvGQGY',
    authDomain: process.env["REACT_APP_FIREBASE_AUTH_DOMAIN "],
    projectId: process.env["REACT_APP_FIREBASE_PROJECT_ID "],
    storageBucket: process.env["REACT_APP_FIREBASE_STORAGE_BUCKET "],
    messagingSenderId: process.env["REACT_APP_FIREBASE_MESSAGING_SENDER_ID "],
    appId: process.env["REACT_APP_FIREBASE_APP_ID "]
};

// Initialize Firebase
export const appAuth = initializeApp(firebaseConfig);

