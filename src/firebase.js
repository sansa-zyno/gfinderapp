import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7dMZYUkMRnpIwKLaUm88JDm8lcQ_3j0A",
  authDomain: "githubfinder-170f7.firebaseapp.com",
  projectId: "githubfinder-170f7",
  storageBucket: "githubfinder-170f7.appspot.com",
  messagingSenderId: "440117756571",
  appId: "1:440117756571:web:7c020d5dbe5c6cf1babc3e"
  };
  
  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(firebase);
 export const db = getFirestore(firebase);
 export default firebase;