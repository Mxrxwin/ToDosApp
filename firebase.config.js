// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtvaDVTuIKl9NuYGtunprnDKbqSumu17c",
  authDomain: "test-ed548.firebaseapp.com",
  projectId: "test-ed548",
  storageBucket: "test-ed548.appspot.com",
  messagingSenderId: "617428072842",
  appId: "1:617428072842:web:5552b3dc29f1e5fb73f073",
  measurementId: "G-FTJMNZ33XS"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);