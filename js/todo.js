const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input")
const toDoList = document.getElementById("todo-list");

let ToDolist = [];

function saveToDos()
{
    localStorage.setItem("save",JSON.stringify(ToDolist)); //로컬스토리지에 String모양을 하고있는 array를 삽입하기.
}


function DeleteToDo(event)
{
    const li = event.target.parentElement;
    li.remove(); //삭제되는 모습을 보여줌. 
    ToDolist = ToDolist.filter((todo)=> todo.id !== parseInt(li.id));  //li.id는 삭제버튼을 클릭한 것의 id를 말함. 
    saveToDos(); //삭제후 localStorage 업데이트 
}   

function PaintToDo(newTodo)
{
    const li =document.createElement("li");
    li.id = newTodo.id; //html에 id 추가하기.  
    const span=document.createElement("span");
    span.innerText= newTodo.text;
    const button = document.createElement("button");
    button.innerText="?";
    li.appendChild(span); 
    li.appendChild(button); 
    toDoList.appendChild(li);
    button.addEventListener("click",DeleteToDo);
}

function handleTodoSubmit(event)
{
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value="";
    const newTodoObj={text: newTodo, //object 형식으로 만들기 
        id: Date.now(),
    };
    ToDolist.push(newTodoObj);  //array에 먼저넣기
    PaintToDo(newTodoObj);     //그리기
    saveToDos();              // localStorage에 넣기 
}

toDoForm.addEventListener("submit",handleTodoSubmit);

const toDo = localStorage.getItem("save");
if(toDo)
{
    const j = JSON.parse(toDo);
    ToDolist= j;
    ToDolist.forEach(PaintToDo);
}