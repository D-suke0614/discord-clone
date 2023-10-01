// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider, getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4_OuHsJVe3JBGdzIdhXUagIrZnVfJ16M",
  authDomain: "discord-clone-32a78.firebaseapp.com",
  projectId: "discord-clone-32a78",
  storageBucket: "discord-clone-32a78.appspot.com",
  messagingSenderId: "608251160940",
  appId: "1:608251160940:web:c9919d77eb73277b052b49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider, db }
