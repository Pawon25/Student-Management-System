// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAhD0YdJxNJ0Gq-RfPpuZr8Ha8model8xg",
    authDomain: "student-management-mipzo.firebaseapp.com",
    projectId: "student-management-mipzo",
    storageBucket: "student-management-mipzo.firebasestorage.app",
    messagingSenderId: "14954846944",
    appId: "1:14954846944:web:7b8fcf1654f8cd41228e85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 