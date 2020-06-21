import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()
export const fireauth = firebase.auth();

const authprovider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  fireauth.signInWithPopup(authprovider);
};

const getUserDoc = async (uid: any) => {
  if (!uid) return null;
  try {
    const userDoc = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDoc.data()
    };
  } catch (error) {
    
  }
};

export const createUserDoc = async (user:any, additionalData?: firebase.firestore.DocumentData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      
    }
  }
  return getUserDoc(user.uid);
};

