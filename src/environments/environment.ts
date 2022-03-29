import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyALh-1LYD1gB_Fagrme0I_aArhTBivKUxo",
    authDomain: "techtraining-be402.firebaseapp.com",
    projectId: "techtraining-be402",
    storageBucket: "techtraining-be402.appspot.com",
    messagingSenderId: "714900083147",
    appId: "1:714900083147:web:4944cf5b820b40e391264e"
  }
};

const app = initializeApp(environment.firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore()
