import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, setDoc ,doc, collection, addDoc, getDocs,deleteDoc} from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js';
import { firebaseConfig } from "./consts.js";



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersRef = collection(db, 'logged_in_user');
var name;
var email;
const html_name = document.getElementById("user_name");
const html_email = document.getElementById("user_email");

getDocs(usersRef)
  .then((querySnapshot) => {
    // Loop through the documents and log the data
    querySnapshot.forEach((doc) => {
      name =  doc.data().name
      email = doc.data().email
      html_name.innerHTML = name;
      html_email.innerHTML = email;
      
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });


