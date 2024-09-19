import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAprWxTcYFu5qzR405SU6bQoK_NAGOo-LA",
  authDomain: "youngs-market.firebaseapp.com",
  projectId: "youngs-market",
  storageBucket: "youngs-market.appspot.com",
  messagingSenderId: "982858034230",
  appId: "1:982858034230:web:401a62e4a73ee1ed8afc97",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
