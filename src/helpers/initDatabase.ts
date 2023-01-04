import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcyDQcvvamOqnZ2ZZfO85Wmzw5z0tE69g",
  authDomain: "chutes-and-ladders-demo.firebaseapp.com",
  projectId: "chutes-and-ladders-demo",
  storageBucket: "chutes-and-ladders-demo.appspot.com",
  messagingSenderId: "327361735895",
  appId: "1:327361735895:web:4ab7dc928d28595136d492",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
