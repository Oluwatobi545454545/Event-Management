// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from
    "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDavJ_vkK0PVQfZO0kPP4Bfy3JtaAUdOVg",
    authDomain: "eventbrite-500fa.firebaseapp.com",
    projectId: "eventbrite-500fa",
    storageBucket: "eventbrite-500fa.firebasestorage.app",
    messagingSenderId: "956739031892",
    appId: "1:956739031892:web:ae9ce6618bcc48f9de2ec1"
};
const app = initializeApp(firebaseConfig);




signup.addEventListener("click", () => {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log("here");

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userdata = {
                email: email,
                name: name,
                password: password
            };
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef,userdata)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email already exists'){
                console.log("already exists")
                
            }
            // ..
        });
})

