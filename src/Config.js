import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyDjYMwIWLGjrcLZwTLZ6idQujoENn_8gLA",
    authDomain: "facebook-messanger-clone-58ce2.firebaseapp.com",
    projectId: "facebook-messanger-clone-58ce2",
    storageBucket: "facebook-messanger-clone-58ce2.appspot.com",
    messagingSenderId: "582190606198",
    appId: "1:582190606198:web:8374bb9d557decce6bfc57",
    measurementId: "G-4N3Z4MGNDN"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
// const auth = firebase.auth();

export default db ;