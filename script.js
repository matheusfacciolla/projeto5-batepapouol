let nameUser = prompt("Qual seu nome?");
let newLastMessage = "";
let lastMessage = "";

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
        window.location.reload();
    }       
}

function promiseFailed(erro) {
    alert("Já existe um usuário com este nome, digite outro...");
    nameUser = prompt("Qual seu nome?");
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

        if(msgs[i].type === "message" ){
            section.innerHTML += `
            <div class="box-msg message" data-identifier="message">
                <div>
                    <p><span class="time">(${msgs[i].time})</span><strong>${msgs[i].from}</strong>para <strong>${msgs[i].to}:</strong>${msgs[i].text}</p>
                </div>
            </div>`;

        } else if (msgs[i].type === "private_message"){
            if(nameUser === msgs[i].to || nameUser === msgs[i].from){
                section.innerHTML += `
                <div class="box-msg private_message" data-identifier="message">
                    <div>
                        <p><span class="time">(${msgs[i].time})</span><strong>${msgs[i].from}</strong>reservadamente para<strong>${msgs[i].to}:</strong>${msgs[i].text}</p>
                    </div>
                </div>`;
            }

        } else if (msgs[i].type === "status"){
            section.innerHTML += `
            <div class="box-msg status" data-identifier="message">
                <div>
                    <p><span class="time">(${msgs[i].time})</span><strong>${msgs[i].from}</strong>${msgs[i].text}</p>
                </div>
            </div>`;
        }

        newLastMessage = document.querySelector(".box-msg:last-child");
        if (newLastMessage.innerHTML !== lastMessage.innerHTML) {
            newLastMessage.scrollIntoView()
            lastMessage = newLastMessage;
        }
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
        promiseSendPost.then(cleanInput);
        promiseSendPost.catch(leaveRoom);
    }   
}

function cleanInput(){
    let msg = document.querySelector("input");
    msg.value = "";
}

//Side bar - bonus
const sideBar = document.querySelector(".sidebar");
const aside = document.querySelector("aside");

function openSideBar(){
    sideBar.classList.remove("hidden");
    aside.classList.remove("hidden");
}

function getOutSideBar(event) {
    if (event.target == aside) {
        sideBar.classList.add("hidden");
        aside.classList.add("hidden");
    }
}

window.addEventListener('click', getOutSideBar)