import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAZW94oGiV8TvDlx6JR60VBSrStfhKIAsQ",
    authDomain: "theta-csrmodel.firebaseapp.com",
    projectId: "theta-csrmodel",
    storageBucket: "theta-csrmodel.firebasestorage.app",
    messagingSenderId: "247215849223",
    appId: "1:247215849223:web:c90925a8903f737cc44fa2",
    measurementId: "G-PKTW89K34C"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };