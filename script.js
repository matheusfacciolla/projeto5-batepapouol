/* join room and request for name*/

let nameUser = null;

joinRoom();

function joinRoom(){
    
    let nameUser = prompt("Qual seu nome?");

    if(nameUser) {
        const participants = {
            name: nameUser
        };
        const promiseJoinRoom = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", participants);
        promiseJoinRoom.then(searchMessages); 
        promiseJoinRoom.catch(promiseFailed); 
    } else {
        alert("Precisa preencher seu nome");
        nameUser = prompt("Qual seu nome?"); 
    }
}

function promiseFailed(erro) {
    alert("Vish, algo falhou! Tente novamente!");
    console.log(erro.response);
}

/* request for posts */

function searchMessages (){
    const promiseMessage = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promiseMessage.then(showPosts);
}

/* show posts in the screen */

function showPosts(response) {
    const msgs = response.data;

    for (let i = 0; i < msgs.length; i++) {

        let msg = msgs[i];
        const section = document.querySelector("section");

            section.innerHTML += `
            <div class="box-msg ${msg.type}">
                <p>(${msg.time}) ${msg.from} para ${msg.to}: ${msg.text}</p> 
            </div>`;
    }
}

/* side bar */

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




 