$(document).ready(function () {
    $(".nav-toggler").each(function (_, navToggler) {
        var target = $(navToggler).data("target");
        $(navToggler).on("click", function () {
            $(target).animate({
                height: "toggle"
            });
        });
    });
});


let getstarted = document.getElementById("getstarted")
getstarted.addEventListener('click', () => {
    window.location.href = "../selltickets2/selltickets2.html"
})

let signup = document.getElementById("signup")
signup.addEventListener('click', () => {
    window.location.href = "./payment/payment.html"
    alert("You are signed up")

})

const openSignup = document.getElementById("Signup");
const signupModal = document.getElementById("signupModal");
const homepage = document.getElementById("homepage1");

// Open Modal
openSignup.addEventListener("click", () => {
    signupModal.classList.remove("hidden");
    console.log('hello');

    // homepage.classList.add("filter", "blur-sm");
});


//////////////////////////////////////////
/////////////////////////////////////////////
//////////////////////////////////////////
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword
  , setPersistence, browserLocalPersistence, onAuthStateChanged, signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDavJ_vkK0PVQfZO0kPP4Bfy3JtaAUdOVg",
  authDomain: "eventbrite-500fa.firebaseapp.com",
  projectId: "eventbrite-500fa",
  storageBucket: "eventbrite-500fa.firebasestorage.app",
  messagingSenderId: "956739031892",
  appId: "1:956739031892:web:ae9ce6618bcc48f9de2ec1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const colRef = collection(db, "Ticketseller");


setPersistence(auth, browserLocalPersistence);
function displayError(elementId, message) {
  const displayErrorElement = document.querySelector(`#${elementId}`);
  displayErrorElement.textContent = message;
  displayErrorElement.style.color = "red";
  displayErrorElement.style.textAlign = "center";
}

// Login Logic
document.getElementById("login").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#loginModal #email").value.trim();
  const password = document.querySelector("#loginModal #password").value.trim();

  if (!email || !password) {
    displayError("displayerrorlogin", "Please enter both email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    displayError("displayerrorlogin", "Login successful!");
    setTimeout(() => {
      document.getElementById("loginModal").classList.add("hidden");
      displayError("displayerrorlogin", ""); // Clear error after success
      showProfileSection(); // Show profile section after successful login
    }, 2000);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      displayError("displayerrorlogin", "No account found with this email. Please sign up first.");
    } else if (error.code === "auth/wrong-password") {
      displayError("displayerrorlogin", "Incorrect password. Please try again.");
    } else {
      displayError("displayerrorlogin", `Error: ${error.message}`);
    }
  }
});

/// Signup Logic
document.getElementById("signup").addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#signupModal #name").value.trim();
  const email = document.querySelector("#signupModal #email").value.trim();
  const password = document.querySelector("#signupModal #password").value.trim();

  if (!name || !email || !password) {
    displayError("displayerror", "Please fill out all fields.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    displayError("displayerror", "Account created successfully! You can now log in.");
    setTimeout(() => {
      document.getElementById("signupModal").classList.add("hidden");
      displayError("displayerror", ""); // Clear error after success
      showProfileSection(); // Show profile section after successful signup
    }, 2000);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      displayError("displayerror", "This email is already registered. Please log in.");
    } else if (error.code === "auth/weak-password") {
      displayError("displayerror", "Password must be at least 6 characters long.");
    } else {
      displayError("displayerror", `Error: ${error.message}`);
    }
  }
});
function showProfileSection() {
  const user = auth.currentUser;

  if (user) {
    document.getElementById('profile-section').style.display = 'block'
    document.getElementById('Login').style.display = 'none'
    document.getElementById('Signup').style.display = 'none'
    document.getElementById('profile-username').textContent = user.displayName || 'Username';  // Set username (or default "Username")
    document.getElementById('profile-email').textContent = user.email;  // Set email
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    showProfileSection();
  } else {
    // User is signed out
    document.getElementById('profile-section').style.display = 'none';
    document.getElementById('Login').style.display = 'block';
    document.getElementById('Signup').style.display = 'block';
  }
});

// Logout Logic
document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("You have logged out successfully!");
    document.getElementById('profile-section').style.display = 'none';
    document.getElementById('Login').style.display = 'block';
    document.getElementById('Signup').style.display = 'block';
  } catch (error) {
    alert(`Error logging out: ${error.message}`);
  }
});

