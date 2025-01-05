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



/////////////////////////////////////////////////////




let homepage1 = document.getElementById("homepage1")
homepage1.addEventListener('click', () => {
  location.reload()
})
let sell = document.getElementById("sell")
sell.addEventListener('click', () => {
  window.location.href = "../sellticket/sellticket.html"
})
let discoverevents = document.getElementById("discoverevents")
discoverevents.addEventListener('click', () => {
  window.location.href = "../index.html"
})
let buyticket = document.getElementById("buyticket")
buyticket.addEventListener('click', () => {
  window.location.href = "../buyticket/buyticket.html"
})
const openSignup = document.getElementById("Signup");
const openLogin = document.getElementById("Login")
const signupModal = document.getElementById("signupModal");
const loginModal = document.getElementById("loginModal")

// Open Modal
openSignup.addEventListener("click", () => {
  signupModal.classList.remove("hidden");
  // console.log('hello');

  // homepage.classList.add("filter", "blur-sm");
});
openLogin.addEventListener('click', () => {
  loginModal.classList.remove("hidden")
})

////////////////////////////////////////////
///////////////////////////////////////////////
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






async function addticketseller() {
  try {
    const fetch = await getDocs(colRef); // Fetch Firestore documents
    console.log("Fetched Documents:", fetch);

    const selectedEventId = localStorage.getItem("selectedEventId");
    if (!selectedEventId) {
      console.error("No event selected.");
      return;
    }
    console.log("Selected Event ID:", selectedEventId);

    let eventFound = false;

    // Process fetched documents
    fetch.forEach(doc => {
      const data = { id: doc.id, ...doc.data() };
      console.log("Blog ID:", data.id);

      // Match selected event ID
      if (data.id === selectedEventId) {
        displayUI(data);
        eventFound = true;
      }
    });

    if (!eventFound) {
      console.error("No event found with the selected ID.");
    }

  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

function displayUI(blog) {
  const maintitle = document.getElementById("maintitle"); 
  maintitle.innerHTML = `
    <h1>${blog.title}</h1>
    
  `;
  const location = document.getElementById("location"); 
  location.innerHTML = `
    <h1>${blog.location}</h1>
    
  `;
  const description = document.getElementById("description"); 
  description.innerHTML = `
    <h1>${blog.description}</h1>
    
  `;
  //for changing anount
  
let minusno = document.getElementById('minusno');
let addno = document.getElementById('addno');
let displayno = document.getElementById('displayno');
let amount = document.getElementById('amount');

// Use the initial value from blog.ticketprice1
let ticketPrice = parseFloat(blog.ticketprice1); 
let count = 1; // Initial ticket count

// Display initial values
amount.textContent = `$ ${ticketPrice}`;
displayno.textContent = count;
minusno.disabled = true; // Disable minus button initially

// Add button click
addno.addEventListener('click', () => {
    ticketPrice += parseFloat(blog.ticketprice1); // Add the initial ticket price
    count++;
    updateUI();
});

// Minus button click
minusno.addEventListener('click', () => {
    if (count > 1) {
        ticketPrice -= parseFloat(blog.ticketprice1); // Subtract the initial ticket price
        count--;
        updateUI();
    }
});

// Update display and button states
function updateUI() {
    amount.textContent = `$ ${ticketPrice}`; // Update ticket price
    displayno.textContent = count; // Update ticket count
    minusno.disabled = count <= 1; // Disable minus button if count is 1
}


}

// Call the function to fetch and display event details
addticketseller();

//////////////////////////////
//////////////////////////////////////////

//for countdown
let datearr = [];

let enddate = new Date('1/31/2025 10:1 AM');

//just to convert to millisec..
let second = 1000;
let minute = second * 60;
let hour = minute * 60;
let day = hour * 24;
let timer;

function showRemaining() {
  let currentdate = new Date();
  let distance = enddate - currentdate;
  if (distance < 0) {

    clearInterval(timer);
    document.getElementById('countdown').innerHTML = 'THIS EVENT HAS EXPIRED!';

    return;
  }
  let days = Math.floor(distance / day);
  let hours = Math.floor((distance % day) / hour);
  let minutes = Math.floor((distance % hour) / minute);
  let seconds = Math.floor((distance % minute) / second);

  document.getElementById('displaydays').innerHTML = days;
  document.getElementById('displayhours').innerHTML = hours;
  document.getElementById('displayminutes').innerHTML = minutes;
  document.getElementById('displayseconds').innerHTML = seconds;
}

setInterval(showRemaining, 1000);