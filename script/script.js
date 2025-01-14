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
let event1 = document.getElementById("event1")
event1.addEventListener('click', () => {
    window.location.href = "./event1/event1.html"
})
let selltickets = document.getElementById("selltickets")
selltickets.addEventListener('click', () => {
  window.location.href = "./sellticket/sellticket.html"
})

let findmytickets = document.getElementById("findmytickets")
findmytickets.addEventListener('click', () => {
    window.location.href = "./findmytickets/findticket.html"
})

const openSignup = document.getElementById("Signup");
const openLogin = document.getElementById("Login");
const signupModal = document.getElementById("signupModal");
const loginModal = document.getElementById("loginModal")

// Open Modal
openSignup.addEventListener("click", () => {
    signupModal.classList.remove("hidden");
  
});
openLogin.addEventListener("click", () => {
    loginModal.classList.remove("hidden")
})

////////////////
///////////////
//firebase
///////////////
///////////////

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword
    ,setPersistence, browserLocalPersistence, onAuthStateChanged, signOut,
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
        displayError("displayerrorlogin", "");
        showProfileSection();
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
        displayError("displayerror", ""); 
        showProfileSection(); 
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
      showProfileSection();
    } else {
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
  
  let maingetstarted = document.getElementById("maingetstarted")
  maingetstarted.addEventListener('click', () => {
    if (!auth.currentUser) {
    signupModal.classList.remove("hidden");
    } else{
      window.location.href = "./sellticket/sellticket.html"
    }
  })
  
  ////////////////////////////////
  //to display data from backend
  ////////////////////////////////
  async function addticketseller() {
    try {
      const fetch = await getDocs(colRef); 
      console.log(fetch);
      fetch.forEach(doc => { 
        const data = { id: doc.id, ...doc.data() };
        displayUI(data);
        console.log(data);
        
      });
      
    } catch (error) {
      console.log(error);

    }
    console.log("jjjjjjjjjj");
    
  }
  addticketseller()
  function displayUI(blog) {
    let allevents = document.getElementById("allevents");

    const eventdiv = document.createElement("div");
    
    eventdiv.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6 ";

    eventdiv.innerHTML = `
        <div class="container mx-auto shadow-lg rounded-lg max-w-md hover:shadow-2xl transition duration-300 cursor-pointer"
            id="event-${blog.id}">
            <div class="relative">
                <img src="https://images.unsplash.com/photo-1627751476653-e954179b174a" alt=""
                    class="rounded-t-lg w-full">
                <button
                    class="absolute bottom-2 right-2 bg-purple-600 text-white px-5 py-4 rounded-lg text-x2 font-medium shadow-md hover:bg-purple-700 transition">
                    <p>${blog.price === 'free' ? 'Free' : `${blog.ticketprice1}`}</p>
                </button>
            </div>
            <div class="p-4">
                <h1
                    class="md:text-1xl text-xl hover:text-indigo-600 transition duration-200 font-bold text-black-900">
                    ${blog.title}</h1>
                <div class="flex items-center space-x-2 text-sm mb-2">
                    <!-- Date -->
                    <div class="flex items-center bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4 mr-1"
                            viewBox="0 0 24 24">
                            <path
                                d="M7 2v2H5a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm-2 6h14v11H5V8zm2 3v2h4v-2H7zm0 4v2h4v-2H7z">
                            </path>
                        </svg>
                        ${blog.date}
                    </div>
                    <!-- Venue -->
                    <div class="flex items-center bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4 mr-1"
                            viewBox="0 0 24 24">
                            <path
                                d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 2a5 5 0 015 5c0 3.19-3.06 7.71-5 9.88C10.06 16.71 7 12.19 7 9a5 5 0 015-5zm0 2a3 3 0 100 6 3 3 0 000-6z">
                            </path>
                        </svg>
                        ${blog.location}
                    </div>
                </div>
                <p>${blog.description}</p>
            </div>
        </div>
    `;

    eventdiv.addEventListener("click", () => {
        console.log("Event clicked:", blog.title);
        localStorage.setItem("selectedEventId", blog.id);
        window.location.href = "./event1/event1.html";
    });

    allevents.appendChild(eventdiv);

    console.log("Event added to UI:", blog.title);
}
  



  const searchsec = JSON.parse(localStorage.getItem("newevent")) || []
  const searchinput = document.getElementById('searchinput');
  
  searchinput.addEventListener('input', ()=>{
    const query = searchinput.value.toLowerCase();
    const foundEvent = searchsec.find(newevent => 
      newevent.title.toLowerCase().includes(query)
     )
     allevents.innerHTML = '  '
     if (foundEvent) {
      allevents.innerHTML = `
          <div class="event">
              <h3>${foundEvent.title}</h3>
              <p>Date: ${foundEvent.date}</p>
              <p>Location: ${foundEvent.location}</p>
              <p>${foundEvent.description}</p>
          </div>
      `;
  } else {
      allevents.innerHTML = "<p>No events found.</p>";
  }
  })
    //    if (query.trim() === "") {
    //     searchResults.innerHTML = "<p>Start typing to search for events.</p>";
    //     return;
    // }

    // // Filter events that match the query
    // const filteredEvents = events.filter(event => 
    //     event.title.toLowerCase().includes(query) ||
    //     event.location.toLowerCase().includes(query) ||
    //     event.description.toLowerCase().includes(query)
    // );

    // // Display the results or a "not found" message
    // if (filteredEvents.length > 0) {
    //     filteredEvents.forEach(event => {
    //         searchResults.innerHTML += `
    //             <div class="event">`
    //     })
    //   }
    ////////////////////////////////
  ////////////////////////////////

