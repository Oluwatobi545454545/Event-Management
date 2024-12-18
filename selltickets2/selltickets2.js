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



let addticketbtn = document.getElementById('addticketbtn')
let answer = document.getElementById("answer")
let display2 = document.getElementById("display2")
function showprice() {
    let select = (document.getElementById("select").value)

    if (select === 'free') {
        answer.innerHTML = ''
        addticketbtn.style.display = 'none'
    } else if (select === 'paid') {
        addticketbtn.style.display = 'flex'
        answer.innerHTML = `
        <div style="display: flex; gap: 5px; margin-top:1rem; justify-content:center;" >
            <input type="text" class="w-1/2 p-3 border border-gray-300 rounded-lg"
            placeholder="Ticket Category (e.g., Regular)">
            <input type="number" class="w-1/2 p-3 border border-gray-300 rounded-lg"
            placeholder="Price (e.g., 5000)"> 
            <button type="button"  class="bg-red-500 text-white py-2 px-4 rounded-lg">Remove</button>
        </div>
        `
    }
}
select.addEventListener('change', showprice)
addticketbtn.addEventListener('click', ()=>{
    display2.innerHTML += `
    <div style="display: flex; gap: 5px; margin-top:1rem; justify-content:center;" >
        <input type="text" class="w-1/2 p-3 border border-gray-300 rounded-lg"
        placeholder="Ticket Category (e.g., VVIP)">
        <input type="number" class="w-1/2 p-3 border border-gray-300 rounded-lg"
        placeholder="Price (e.g., 10,000)"> 
        <button type="button" id="deleteticket" class="bg-red-500 text-white py-2 px-4 rounded-lg">Remove</button>
    </div>
    `
    document.getElementById('deleteticket').addEventListener('click',()=>{
        display2.remove()

    })
})