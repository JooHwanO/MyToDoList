
import { year, mon, DayOfChoice, Day } from "./cleander.js"

const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input")
const toDoList = document.getElementById("todo-list");

let ToDolist = [];
let YMD = year + '-' + mon + '-' + DayOfChoice;

let toDo = localStorage.getItem(YMD);

//console.log(toDo);

if (toDo) {
    const selectvalue = selectTodo();
    //   console.log(selectvalue);
    selectvalue.forEach(PaintToDo); //돌아가며 그리기
}

Day.addEventListener('click', (event) => {
    YMD = year + '-' + mon + '-' + DayOfChoice;
    console.log(YMD);
    selectTodo().forEach(PaintToDo);
    
});

function selectTodo() {
    toDo = localStorage.getItem(YMD); //1. 현재날짜것만 가져옴. 
    if (toDo) { //2. 값이 있는지 확인함. 
        const j = JSON.parse(toDo); //JSON형식으로 변환 
        console.log(j);
        ToDolist = j;  //ToDolist에 select된 값만 넣음. 
        console.log(ToDolist,"hhh");
         //  선택된값만 담김
         return ToDolist;
    }
    else{
        ToDolist=[];
        return ToDolist;
    }
}


function PaintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.time; //html에 id 추가하기.  
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
    button.addEventListener("click", DeleteToDo);
}
/*불러오기*/


//넣기
function saveToDos() {
    console.log(ToDolist);
    const imsi = [];
    ToDolist.forEach((value) => {
        if (value.id === YMD) {
            console.log(value.id, "ddd");
            imsi.push(value);
        }
    })
    localStorage.setItem(YMD, JSON.stringify(imsi)); //로컬스토리지에 String모양을 하고있는 array를 삽입하기.
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo, //object 형식으로 만들기 
        time: Date.now(),
        id: YMD
    };
    ToDolist.push(newTodoObj);  //array에 먼저넣기
    PaintToDo(newTodoObj);     //그리기
    saveToDos();              // localStorage에 넣기 
}



toDoForm.addEventListener("submit", handleTodoSubmit);


function DeleteToDo(event) {
    const li = event.target.parentElement;
    li.remove(); //삭제되는 모습을 보여줌. 
    console.log(li);
    console.log(ToDolist, "hhh");
    ToDolist = ToDolist.filter((todo) => parseInt(todo.time) !== parseInt(li.id));  //li.id는 삭제버튼을 클릭한 것의 id를 말함. 
    saveToDos(); //삭제후 localStorage 업데이트 
}


