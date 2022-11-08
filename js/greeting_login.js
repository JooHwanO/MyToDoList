const loginInput = document.querySelector("#login-form input");
const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
const alink = document.querySelector("a");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";


/*
function paintGreetings(username) {
    greeting.classList.remove(HIDDEN_CLASSNAME); //10. 숨겨져 있던것을 제거하고 나타냄
    greeting.innerHTML = `Hello  ${username}`     //11. input에 입력된것을 h1에 출력. 
    
}*/

function onLoginSubmit(event) {
    event.preventDefault(); //5. submit 이벤트의 기본동작인 새로고침 막기
    loginForm.classList.add(HIDDEN_CLASSNAME); //6. 제출을 클릭하였으니 입력창 숨기기  
    const username = loginInput.value; //7. input 의 값을 얻어서 
    localStorage.setItem(USERNAME_KEY, username); //8. local에 저장(중요)
    window.location ='index.html';
    // paintGreetings(username); //9. 해당함수 실행 
}

//0. 초기상태는 hidden 으로 아무것도 없는 상태 
const saveUsername = localStorage.getItem(USERNAME_KEY); //1. localstorage에서 값 확인

if (saveUsername === null) //2. 값이 null이면 
{
    loginForm.classList.remove(HIDDEN_CLASSNAME); //3. hidden으로 설정된것을 제거
    loginForm.addEventListener("submit", onLoginSubmit); //4. 제출 클릭시 onLoginSubmit 함수 실행 
}

else { //12. null이 아니라면 
    //paintGreetings(saveUsername); //13. localstorage에 있는것을 넘김. -> 9로
    window.location ='index.html';
}


/*

function onLinkHandle(event)
{
    event.preventDefault();
}
alink.addEventListener("click",onLinkHandle);*/