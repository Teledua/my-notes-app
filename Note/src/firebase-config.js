// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4XCwotaXj83rrhQn9VkG28ESlT2o1QQM",
  authDomain: "noteapp-c6714.firebaseapp.com",
  projectId: "noteapp-c6714",
  storageBucket: "noteapp-c6714.appspot.com",
  messagingSenderId: "856207747581",
  appId: "1:856207747581:web:142bb912f5b3f549159194"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

