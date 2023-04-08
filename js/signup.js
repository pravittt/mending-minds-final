//import {app} from './consts.js'


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getFirestore, setDoc ,doc, collection, addDoc} from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js';
import { firebaseConfig } from "./consts.js";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const signUpForm = document.querySelector('#signup-form');
const auth = getAuth(app);
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signUpForm['email'].value;
    const password = signUpForm['password'].value;
    const confPass = signUpForm['confirm-password'].value;
    const name = signUpForm['name'].value;

    const dbRef = collection(db, "users");
    

    if (password === confPass){
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            const data = {
              name: name,
              email: email
           };
            addDoc(dbRef, data)
 .then(docRef => {
     console.log("Document has been added successfully");
     window.location.href = "index.html";
 })
 .catch(error => {
     console.log(error);
 })


            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
                alert('The password is too weak.');
              } else if (errorCode === 'auth/email-already-in-use') {
                alert('The email address is already in use.');
              } else if (errorCode === 'auth/invalid-email') {
                alert('The email address is not valid.');
              } else {
                alert(errorMessage);
              }
        });
          
    }
    

    else{
        alert("Different Passwords");
    }
    
    
       
});