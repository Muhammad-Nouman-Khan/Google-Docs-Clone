import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQfRk_nBezqCsknwJMND1leH-Os9SGUhY",
  authDomain: "docs-7d0ee.firebaseapp.com",
  projectId: "docs-7d0ee",
  storageBucket: "docs-7d0ee.appspot.com",
  messagingSenderId: "845267709371",
  appId: "1:845267709371:web:2732fa184424817d79a89e",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
