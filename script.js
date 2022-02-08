const sideBar = document.querySelector(".sidebar");
const aside = document.querySelector("aside");

function openSideBar(){
    sideBar.classList.remove("hidden");
    aside.classList.remove("hidden");
}

function getOutSideBar(event) {
    if (event.target == aside) {
        sideBar.classList.add("hidden")
        aside.classList.add("hidden");
    }
}

window.addEventListener('click', getOutSideBar)