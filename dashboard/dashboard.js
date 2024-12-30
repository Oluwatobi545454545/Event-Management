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

document.getElementById("createventbtn").addEventListener("click", () => {
    window.location.href = "../sucess/success.html"
});

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

