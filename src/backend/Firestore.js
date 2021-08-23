import firebase from 'firebase/app';
import 'firebase/firestore';
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "gre-words-list.firebaseapp.com",
    projectId: "gre-words-list",
    storageBucket: "gre-words-list.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
firebase.initializeApp(config);
export default firebase;