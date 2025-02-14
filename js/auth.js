import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// DOM elements
const loginSection = document.getElementById('loginSection');
const signupSection = document.getElementById('signupSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');

document.addEventListener('DOMContentLoaded', () => {
    // Show signup section
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.classList.add('hidden');
        signupSection.classList.remove('hidden');
    });

    // Show login section
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    });
});

// Signup functionality
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        signupForm.reset();
        signupSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
    } catch (error) {
        alert(error.message);
    }
});

// Login functionality
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        loginForm.reset();
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
    } catch (error) {
        alert(error.message);
    }
});

// Logout functionality
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        dashboardSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    } catch (error) {
        alert(error.message);
    }
});

// Auth state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        loginSection.classList.add('hidden');
        signupSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
    } else {
        dashboardSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    }
}); 