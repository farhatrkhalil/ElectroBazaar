import { initializeApp } from 'firebase/app';

import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, updateDoc, getDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDDkbHlIcsKkk62lwmfA6viz05Pa8l1Qfs",
    authDomain: "electrobazaar-bfd3a.firebaseapp.com",
    databaseURL: "https://electrobazaar-bfd3a-default-rtdb.firebaseio.com",
    projectId: "electrobazaar-bfd3a",
    storageBucket: "electrobazaar-bfd3a.appspot.com",
    messagingSenderId: "848805237957",
    appId: "1:848805237957:web:49c1d94361357cc6520cac",
    measurementId: "G-RYYZMLQZ5J"
};

const firebaseApp = initializeApp(firebaseConfig);


const app = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(app);

export { db, collection, addDoc, query, where, getDocs, auth, firebaseApp, deleteDoc, updateDoc, getDoc, getFirestore, doc, setDoc };