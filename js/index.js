import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, setDoc ,doc, collection, addDoc, getDocs,deleteDoc} from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js';
import { firebaseConfig } from "./consts.js";


var html_login = document.getElementById("login");
var html_signup = document.getElementById("signup");
var html_profile = document.getElementById("profile");
var html_signout = document.getElementById("signout");
  
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const usersRef = collection(db, 'logged_in_user');

// Get a QuerySnapshot of all documents in the collection
const snapshot =  await getDocs(usersRef);

if (snapshot.size > 0) {
    html_login.style.display = 'none';
    html_signup.style.display = 'none';
    html_profile.style.display = 'inline';
    html_signout.style.display = 'inline';
  console.log("There is data in the users collection.");
  
} else {
        html_profile.style.display = 'none';
        html_login.style.display = 'inline';
        html_signup.style.display = 'inline';
        html_signout.style.display = 'none';
        console.log("The users collection is empty.");
}
html_signout.addEventListener("click", signOut);

function signOut(){
    const dbRefCurrent = collection(db, "logged_in_user");
    getDocs(usersRef)
  .then((querySnapshot) => {
    // Loop through the documents and log the data
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      alert("You have been logged out")
      
    });
    
    
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
}

