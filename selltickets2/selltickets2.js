let createevent = document.getElementById("create-event-content")
let myorders = document.getElementById("orders-content")
let myreports = document.getElementById("reports-content")
let myevents = document.getElementById("events-content")

document.getElementById("createeventbutton").addEventListener("click", () => {
    myorders.style.display = "none";
    myreports.style.display = "none";
    myevents.style.display = "none";
    createevent.style.display = "block";
});
document.getElementById("ordersbutton").addEventListener("click", () => {
    myorders.style.display = "block";
    myreports.style.display = "none";
    myevents.style.display = "none";
    createevent.style.display = "none";
});
document.getElementById("reportsbutton").addEventListener("click", () => {
    myorders.style.display = "none";
    myreports.style.display = "block";
    myevents.style.display = "none";
    createevent.style.display = "none";
});
document.getElementById("eventsbutton").addEventListener("click", () => {
    myorders.style.display = "none";
    myreports.style.display = "none";
    myevents.style.display = "block";
    createevent.style.display = "none";
});

// document.getElementById("createventbtn").addEventListener("click", () => {
//     window.location.href = "../sucess/success.html"
// });
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const menuIcon = document.getElementById("menu-icon");
const menuItems = document.querySelectorAll(".menu-item");
const contentSections = document.querySelectorAll(".content-section");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");
});

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(btn => btn.classList.remove("active"));
        contentSections.forEach(section => section.classList.add("hidden"));

        item.classList.add("active");
        const target = document.getElementById(item.getAttribute("data-target"));
        if (target) target.classList.remove("hidden");

        if (window.innerWidth < 768) {
            menu.classList.remove("active");
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
        }
    });
});
let createeventbtn = document.getElementById("createevetnbtn")
let addticketbtn = document.getElementById('addticketbtn')
let answer = document.getElementById("answer")
let display2 = document.getElementById("display2")
let tickets = [];
function showprice() {
    let select = (document.getElementById("select").value)

    if (select === 'free') {
        answer.innerHTML = ''
        addticketbtn.style.display = 'none'
    } else if (select === 'paid') {
        addticketbtn.style.display = 'flex'
        answer.innerHTML = `
         <section class="mt-8 mb-4 max-w mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                    <h2 class="text-xl font-semibold text-gray-800 mb-6">How do you want to get paid?</h2>
                    <div id="payment-options" class="space-y-4">
                        <!-- PayPal -->
                        <div
                            class="payment-option flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:shadow-md transition cursor-pointer">
                            <div class="flex items-center">
                                <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal"
                                    class="w-10 h-10 mr-4">
                                <span class="text-gray-700 font-medium">PayPal</span>
                            </div>
                        </div>
                          <!-- Bank Transfer -->
                        <div
                            class="payment-option flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:shadow-md transition cursor-pointer">
                            <div class="flex items-center">
                                <img src="https://cdn-icons-png.flaticon.com/512/2910/2910766.png" alt="Bank Transfer"
                                    class="w-10 h-10 mr-4">
                                <span class="text-gray-700 font-medium">Bank Transfer</span>
                            </div>
                        </div>
                        <!-- Credit/Debit Card -->
                        <div
                            class="payment-option flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:shadow-md transition cursor-pointer">
                            <div class="flex items-center">
                                <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Card Payment"
                                    class="w-10 h-10 mr-4">
                                <span class="text-gray-700 font-medium">Credit/Debit Card(Nigeria only)</span>
                            </div>
                        </div>
                        <!-- Stripe -->
                        <div
                            class="payment-option flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:shadow-md transition cursor-pointer">
                            <div class="flex items-center">
                                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968887.png" alt="Stripe"
                                    class="w-10 h-10 mr-4">
                                <span class="text-gray-700 font-medium">Stripe</span>
                            </div>
                        </div>
                      
                    </div>
                </section>
                <div style="display: flex; gap: 5px; margin-top:1rem; justify-content:center;" >
                    <input type="text" id="ticketcategory1" class="w-1/2 p-3 border border-gray-300 rounded-lg"
                    placeholder="Regular">
                    <input type="number" id="ticketprice1" class="w-1/2 p-3 border border-gray-300 rounded-lg"
                    placeholder="Price (e.g., 5000)"> 
                    <button type="button"  class="bg-red-500 text-white py-2 px-4 rounded-lg">Remove</button>
                </div>
        
        `
        document.querySelectorAll('.payment-option').forEach(option => {
            option.addEventListener('click', function () {
                // Remove 
                document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('bg-purple-100', 'border-purple-500'));

                this.classList.add('bg-purple-100', 'border-purple-500');
            });
        });
        //for click color^^^^^^^^^^
    }
}
select.addEventListener('change', showprice)

function renderTickets() {
    display2.innerHTML = '';
    tickets.forEach((ticket, index) => {
        display2.innerHTML += `
            <div style="display: flex; gap: 5px; margin-top:1rem; justify-content:center;" >
                    <input type="text" id="ticketcategory2" class="w-1/2 p-3 border border-gray-300 rounded-lg" 
                    placeholder="VVIP" >
                    <input type="number" id="ticketprice2" class="w-1/2 p-3 border border-gray-300 rounded-lg"
                    placeholder="Price (e.g., 10,000)" > 
                    <button type="button" onclick="deleteTicket(${index})"class="bg-red-500 text-white py-2 px-4 rounded-lg">Remove</button>
            </div>
            `;
    });
}
addticketbtn.addEventListener('click', () => {
    tickets.push([])
    renderTickets()
    console.log('here');


})



/////////////////
//////////////////
/////////////////
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
const db = getFirestore(app);
const colRef = collection(db, "Ticketseller");
const formarray = [];
const auth = getAuth(); 
const user = auth.currentUser; 


const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('there');


    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const location = document.getElementById('event-location').value;
    const description = document.getElementById('event-description').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('select').value;
    let ticketcategory1Element = document.getElementById('ticketcategory1');
    let ticketcategory1 = ticketcategory1Element ? ticketcategory1Element.value : '';
    console.log(document.getElementById('ticketcategory1'));

    let ticketcategory2Element = document.getElementById('ticketcategory2');
    let ticketcategory2 = ticketcategory2Element ? ticketcategory2Element.value : '';
    console.log(document.getElementById('ticketcategory2'));
    
    let ticketprice1Element = document.getElementById('ticketprice1');
    let ticketprice1 = ticketprice1Element ? ticketprice1Element.value : '';
    console.log(document.getElementById('ticketprice1'));

    let ticketprice2Element = document.getElementById('ticketprice2');
    let ticketprice2 = ticketprice2Element ? ticketprice2Element.value : '';
    console.log(document.getElementById('ticketprice2'));
    console.log({ title, date, time, location, description, quantity, price, ticketcategory1, ticketprice1, ticketcategory2, ticketprice2 })

    if (price === 'paid') {
        ticketcategory1Element = document.getElementById('ticketcategory1');
        ticketcategory1 = ticketcategory1Element ? ticketcategory1Element.value : '';
        
        ticketprice1Element = document.getElementById('ticketprice1');
        ticketprice1 = ticketprice1Element ? ticketprice1Element.value : '';
    } else if (price === 'free') {
        ticketcategory1 = 'Free Entry';
        ticketprice1 = '0';
    }
    
    // const auth = getAuth();
    // const user = auth.currentUser;
    // if (user) {
    //     const sellerId = user.uid; // This is the seller's unique ID
    // }

    const eventData = {
        title,
        date,
        time,
        location,
        description,
        quantity,
        price,
        ticketcategory1,
        ticketcategory2,
        ticketprice1,
        ticketprice2,
    };

    // window.location.href ="../sucess/success.html"
    formarray.push(eventData)
    console.log(formarray);
    localStorage.setItem("newevent", JSON.stringify(formarray));

    localStorage.setItem('newevent2', JSON.stringify(eventData));

    console.log('Event Data:', eventData);
    try {

        console.log("Event Data:", eventData);
        await addDoc(colRef, eventData);
        alert("Event created successfully!");
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});


