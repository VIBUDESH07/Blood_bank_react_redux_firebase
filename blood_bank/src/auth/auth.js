// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDJrNSfU7S9CF_lEIf4Z81uYXeDMfiLI2Y",
  authDomain: "blood-bank-react-b9aca.firebaseapp.com",
  projectId: "blood-bank-react-b9aca",
  storageBucket: "blood-bank-react-b9aca.appspot.com",
  messagingSenderId: "178620252212",
  appId: "1:178620252212:web:88643e5041579b3d518a61",
  measurementId: "G-S6ZGCXDXQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);