

const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";


const logout_but = document.querySelector("#logout");




function onLogoutClick() {
    if(window.confirm("확인을 누르면 저장되었던 데이터가 모두 삭제됩니다.\n 그래도 하시겠습니까?")){
        localStorage.removeItem(USERNAME_KEY);
        window.location = 'login.html'
        return true;
    }
    else{
        return false;
    }

}
logout_but.addEventListener("click", onLogoutClick)

function paintGreetings(username) {
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerHTML = `${username} 님`
}

paintGreetings(localStorage.getItem(USERNAME_KEY));