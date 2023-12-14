import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBowAL7ia0SGwlF-ZCk6dyE6EnpNxaNpeo",
  authDomain: "test-sam-312a7.firebaseapp.com",
  projectId: "test-sam-312a7",
  storageBucket: "test-sam-312a7.appspot.com",
  messagingSenderId: "541918023623",
  appId: "1:541918023623:web:596384cff9b9cb5da413e2",
  measurementId: "G-22GN3K4EQ1"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const imgDb = getStorage(app)
export {db, imgDb}
