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

async function getAdmins() {

    let adminList = [];

    await firebase.firestore().collection('admin').onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
            const admin = doc.data();
            adminList.push(admin.email.toLowerCase());
        });
    });

    return adminList;
}

export const admins = getAdmins();

export default firebase;