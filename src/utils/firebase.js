// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUsVWJykq3ZSG1JYYXNXPLCFSn4N3hCk4",
  authDomain: "netflixgpt-7ad63.firebaseapp.com",
  projectId: "netflixgpt-7ad63",
  storageBucket: "netflixgpt-7ad63.firebasestorage.app",
  messagingSenderId: "93141914235",
  appId: "1:93141914235:web:d7084ea71095cfe64bc8de",
  measurementId: "G-PYEGLM7KKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();