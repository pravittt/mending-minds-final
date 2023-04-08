
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getFirestore, setDoc ,doc, collection, addDoc,getDocs,query,where} from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js';
import { firebaseConfig } from "./consts.js";




const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const logInForm = document.querySelector('#login-form');
const usersRef = collection(db, "users");

 

const auth = getAuth(app);
logInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = logInForm['email'].value;
  const password = logInForm['password'].value;

 
 
    

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const q = query(collection(db, "users"), where("email", "==", email));


    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().email);
        console.log(doc.data().name);
        const data = {
          name: doc.data().name,
          email: doc.data().email
       };

       const dbRefCurrent = collection(db, "logged_in_user");
       addDoc(dbRefCurrent, data)
 .then(docRef => {
     console.log("Document has been added successfully");
     window.location.href = "index.html";
 })
 .catch(error => {
     console.log(error);
 })
      });
    });

     
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorMessage)
    if (errorCode == "auth/user-not-found" || errorCode == "auth/wrong-password"){

      alert("You have entered wrong credentials")
    }

  });


});