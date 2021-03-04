import * as firebase from 'firebase/app'
import 'firebase/firestore';
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAKjCBKxRKHQSA4XjyhfHF_JAWvyIk5FdU",
    authDomain: "ntpc1-5b6cf.firebaseapp.com",
    databaseURL: "https://ntpc1-5b6cf-default-rtdb.firebaseio.com",
    projectId: "ntpc1-5b6cf",
    storageBucket: "ntpc1-5b6cf.appspot.com",
    messagingSenderId: "81656514047",
    appId: "1:81656514047:web:53a8b5682e16d3bd97d3ca",
    measurementId: "G-TD1LZKZ5RP"
  };
  
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }
  
  export default firebase;