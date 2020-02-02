import firebase from "firebase";
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBsfq4N_HHnKqiy9nZLdWmLGP3sQRhdya4",
  authDomain: "randomize-77c15.firebaseapp.com",
  databaseURL: "https://randomize-77c15.firebaseio.com",
  projectId: "randomize-77c15",
  storageBucket: "randomize-77c15.appspot.com",
  messagingSenderId: "492829533830",
  appId: "1:492829533830:web:3865346e3f8303e4c41307",
  measurementId: "G-EKFFZ7BPYC"
};

firebase.initializeApp(firebaseConfig);

export { firebase };
