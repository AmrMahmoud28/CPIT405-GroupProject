// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWbQRGP-730J6SoJIg8B8DLP2T1K8ToSo",
  authDomain: "cpit405-groupproject.firebaseapp.com",
  databaseURL: "https://cpit405-groupproject-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cpit405-groupproject",
  storageBucket: "cpit405-groupproject.firebasestorage.app",
  messagingSenderId: "689136199596",
  appId: "1:689136199596:web:84e620167533690479fc09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);