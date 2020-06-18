import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAAVidvexnookSFFYGq1Uyxw07qwOK0zEE",
    authDomain: "my-workers.firebaseapp.com",
    databaseURL: "https://my-workers.firebaseio.com",
    projectId: "my-workers",
    storageBucket: "my-workers.appspot.com",
    messagingSenderId: "488960506490",
    appId: "1:488960506490:web:25dfa6d6d1d2f51b3219c3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  export default firebase