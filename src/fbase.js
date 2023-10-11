import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";



// Your web app's Firebase configuration
/*const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
};*/

const firebaseConfig = {
    apiKey: "AIzaSyAxL0AiGTnM1e_M3P60-7BVAwewpqLGvuY",
    authDomain: "nwitter-d91ae.firebaseapp.com",
    projectId: "nwitter-d91ae",
    storageBucket: "nwitter-d91ae.appspot.com",
    messagingSenderId: "112349353378",
    appId: "1:112349353378:web:a0c72e36efdd7548234efb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const storageService = firebase.storage();


