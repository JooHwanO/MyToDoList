
import { year, mon, DayOfChoice, Day } from "./cleander.js"

const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input")
const toDoList = document.getElementById("todo-list");

const add = document.querySelector(".add");
const reset = document.querySelector(".reset");
const Allreset = document.querySelector(".allreset");

let ToDolist = [];
let YMD = year + '-' + mon + '-' + DayOfChoice;
let toDo = localStorage.getItem(YMD); //현재날짜것만 가져옴


if (toDo) {
    const selectvalue = selectTodo();
    selectvalue.forEach(PaintToDo); //돌아가며 그리기
}

function selectTodo() {
    toDoList.innerHTML='';
    toDo = localStorage.getItem(YMD); //1. 현재날짜것만 가져옴.
    if (toDo) { //2. 값이 있는지 확인함. 
        const j = JSON.parse(toDo); //JSON형식으로 변환 
        console.log(j);
        ToDolist = j;  //ToDolist에 select된 값만 넣음. 
        //  선택된값만 담김
        return ToDolist;
    }
    else {
        ToDolist=[]; //빈칸
        return ToDolist;
    }
}

Day.addEventListener('click', (event) => {
    YMD = year + '-' + mon + '-' + DayOfChoice;
    toDoList.innerHTML=''; //왜초기화 되는 효과를 가질까?
    selectTodo().forEach(PaintToDo);
});



function PaintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.time; //html에 id 추가하기.  
    li.className=newTodo.tag;
    const span = document.createElement("span");
    const check = document.createElement("button");
    const button = document.createElement("button");
    const hr=document.createElement("hr");
    span.innerText = newTodo.text;
    console.log(li.className);
    if(li.className==="1")
    {
        check.innerText="⛔";
        span.innerHTML='<s>'+`${span.innerText}`+'</s>'
        
    }
    else{
        check.innerText="✅";
    }
    button.innerText = "❌";
    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(check);
  
    li.appendChild(hr);
    toDoList.appendChild(li);
    button.addEventListener("click", DeleteToDo);
    check.addEventListener("click",(event)=>{
        console.log(event);
        console.log(parent);
        if(span.innerHTML==='<s>'+`${span.innerText}`+'</s>')
        {
            event.target.innerText="✅";
            span.innerHTML=`${span.innerText}`;
            event.target.parentNode.className="0";
            newTodo.tag=0;
            saveToDos();
            
        }
        else{
    
            span.innerHTML='<s>'+`${span.innerText}`+'</s>';
            event.target.innerText="⛔";
            event.target.parentNode.className="1";
            newTodo.tag=1;
            saveToDos();
        }
        
    });
    
   }
/*불러오기*/


//넣기
function saveToDos() {
    console.log(ToDolist);
    YMD = year + '-' + mon + '-' + DayOfChoice;
    const temp = []
    ToDolist.forEach((value) => //여러 날짜중에 
    {
        if (value.id === YMD) //현재날짜와 맞는것맞 temp에 담음
        {
            temp.push(value);
        }
    });
    localStorage.setItem(YMD, JSON.stringify(temp)); //로컬스토리지에 String모양을 하고있는 array를 삽입하기.
}

function handleTodoSubmit(event) {
    event.preventDefault();

    if (toDoInput.value === '') {
        alert('값을 입력해주세요.');
        return;
    }

    const newTodo = toDoInput.value;
    toDoInput.value = "";

    const newTodoObj = {
        text: newTodo, //object 형식으로 만들기 
        time: Date.now(),
        id: YMD,
        tag: 0 
    };
    PaintToDo(newTodoObj);      //그리기
    ToDolist.push(newTodoObj);  //array에 먼저넣기
    saveToDos();                // localStorage에 넣기 
}

toDoForm.addEventListener("submit", handleTodoSubmit);

function DeleteToDo(event) {
    const li = event.target.parentElement;
    li.remove(); //삭제되는 모습을 보여줌. 
    ToDolist = ToDolist.filter((todo) => parseInt(todo.time) !== parseInt(li.id));  //li.id는 삭제버튼을 클릭한 것의 id를 말함. 
    saveToDos(); //삭제후 localStorage 업데이트 
}




add.addEventListener("click", ()=>
{
    if (toDoInput.value === '') {
        alert('값을 입력해주세요.');
        return;
    }

    const newTodo = toDoInput.value;
    toDoInput.value = "";

    const newTodoObj = {
        text: newTodo, //object 형식으로 만들기 
        time: Date.now(),
        id: YMD,
        tag: 0 
    };
    PaintToDo(newTodoObj);      //그리기
    ToDolist.push(newTodoObj);  //array에 먼저넣기
    saveToDos();                // localStorage에 넣기 
});


reset.addEventListener("click", (event)=>{
    YMD = year + '-' + mon + '-' + DayOfChoice;
    localStorage.removeItem(YMD);
    selectTodo().forEach(PaintToDo);
});


Allreset.addEventListener("click", (event)=>{
    localStorage.clear();
    selectTodo().forEach(PaintToDo);
});