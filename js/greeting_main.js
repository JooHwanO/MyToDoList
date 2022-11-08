

const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";


const logout_but=document.querySelector("#logout");


function onLogoutClick()
{
    localStorage.removeItem(USERNAME_KEY);
    window.location ='login.html';
}

logout_but.addEventListener("click",onLogoutClick)

function paintGreetings(username) {
    greeting.classList.remove(HIDDEN_CLASSNAME); 
    greeting.innerHTML = `Hello  ${username}`     
}

paintGreetings(localStorage.getItem(USERNAME_KEY));