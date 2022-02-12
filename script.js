let nameUser = prompt("Qual seu nome?");
let lastMessage = "";
let newLastMessage = "";

joinRoom();
setInterval(checkStatus, 5000);
setInterval(searchMessages, 3000);

//Request with the user name
function joinRoom(){

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
    joinRoom();
}

//Request and render messages
function searchMessages (){
    const promiseMessage = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promiseMessage.then(showMessages);
}

function showMessages(response) {
    let msgs = response.data;
    const section = document.querySelector("section");
    section.innerHTML = "";

    for (let i = 0; i < msgs.length; i++) {
        section.innerHTML += `
            <div class="box-msg ${msgs[i].type}">
            <p>(${msgs[i].time}) ${msgs[i].from} para ${msgs[i].to}: ${msgs[i].text}</p> 
            </div>`;
            newLastMessage = document.querySelector(".box-msg:last-child");
            newLastMessage.scrollIntoView();
    }
}

//Request for check status
function checkStatus (){
    const participants = {
        name: nameUser
    };
    const promiseStatus = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", participants);
    promiseStatus.catch(leaveRoom);
}


function leaveRoom(){
    alert('Você foi desconectado');
    window.location.reload();
}

//Send your post
function sendPost(){
    let msg = document.querySelector("input").value;

    if (msg !== "") {
        let myPost = {
	        from: nameUser,
	        to: "Todos",
	        text: msg,
	        type: "message"
        };

        const promiseSendPost = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", myPost);
          
        promiseSendPost.then(searchMessages);
        promiseSendPost.catch(leaveRoom);
        cleanInput()
    }   
}

function cleanInput(){
    let msg = document.querySelector("input");
    msg.value = "";
}

//Side bar -> bonus
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