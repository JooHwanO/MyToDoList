
import { year, mon, DayOfChoice, Day } from "./caleandar.js"

const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input")
const toDoList = document.getElementById("todo-list");

const add = document.querySelector(".add");
const reset = document.querySelector(".reset");
const Allreset = document.querySelector(".allreset");

let ToDolist = []; 
let YMD = year + '-' + mon + '-' + DayOfChoice; // 선택된 날짜 (처음 시작 시 현재년월일이 담김)
let toDo = localStorage.getItem(YMD);           // 선택된 날짜의 toDo를 localstorage에서 가져옴
let AllToDolist=[]

//시작 지점
if (toDo) {   
    selectTodo().forEach(PaintToDo);   //반환된 SelectToDo의 배열을 
}


/*selectTodo 함수 : LocalStorage에 저장된 String형태로 저장된 배열을 JSON형태로 
                    변환시켜 원래 배열로 변환한 뒤 ToDolist 배열에 담아 반환하는 함수  */
function selectTodo() {
    toDoList.innerHTML='';              //toDoList(html ul) 초기화 
    toDo = localStorage.getItem(YMD);   // 선택된 날짜의 toDo를 localstorage에서 가져옴
    if (toDo) {                         //1. toDo에 값이 있는지 확인함. 
        const j = JSON.parse(toDo);     //2. JSON형식으로 변환(localStorage에 String형으로 들어가있기 때문)
        ToDolist = j;                   //3. ToDolist에 객체 배열 형태로 들어감
        return ToDolist;               // 4. ToDolist 반환
    }
    else {         
        ToDolist=[]; //빈칸
        return ToDolist;
    }
}

/*PaintToDo 함수 : 매개변수로 받은 객체(text,id,time,tag)를 사용하여 그에 맞는 Element를 생성하는 함수 
                   매개변수로 받은 객체의 id와 classname을 사용하여 일정완료 상태와 삭제를 할 수 있도록 설정*/
function PaintToDo(newTodo) {
    const li = document.createElement("li");      //
    li.id = newTodo.time;                         // id값으로에 time 값을 할당하여 나중에 삭제할때 해당 ID를찾아 삭제  
    li.className=newTodo.tag;                     // ✅ 체크 버튼 유무를 판별하기 위한 tag값

    const span = document.createElement("span");        // 일정 text 생성
    span.innerText = newTodo.text;                      // 표시될 일정에 매개변수로 받은 newToDo의 text값을 할당
 
    const check = document.createElement("button");     // 일정 완료 시 ✅ 체크 버튼 생성
    const del = document.createElement("button");    // 일정 ❌ 삭제 버튼 생성 
    del.innerText = "❌";

    const hr=document.createElement("hr");              // 해당 일정 각각 밑줄 생성
    

    //className의 초기상태는 객체 생성 시 tag를 0으로 할당하므로 else문으로 들어감. 
    // 밑의 분기문은 새로 고침해도 해당 상태(체크)를 유지하기위해 사용됨.
    if(li.className==="1")                               // 1. 생성된 일정의 classname이 1이면 
    {            
        check.innerText="⛔";                            // 2. ✅ 체크 버튼을 ⛔로 변경 
        span.innerHTML='<s>'+`${span.innerText}`+'</s>'  //  3. 해당 text를 <s> 태그를 통하여 취소선 표시 
        
    }
    else{                                                 // 4. classname이 1이 아니라면
        check.innerText="✅";                            // 5. 체크가 안된 상태이기 때문에 기본 체크버튼을 표시
    }
    
    li.appendChild(span);
    li.appendChild(del);
    li.appendChild(check);  
    li.appendChild(hr);
    toDoList.appendChild(li);

    del.addEventListener("click", DeleteToDo);                // 삭제버튼 클릭 시 DeleteToDo 함수 실행
    check.addEventListener("click",(event)=>{                 // 체크버튼✅ 클릭 시 
        if(span.innerHTML==='<s>'+`${span.innerText}`+'</s>') // 1. text에 취소선이 그어져 있는 상태라면(⛔상태)
        {
            event.target.innerText="✅";                      // 2. 해당 text를 다시 ✅ 상태로 변경함  
            span.innerHTML=`${span.innerText}`;               // 3.  취소선 해제
            event.target.parentNode.className="0";            // 4. li(target.parentNode)의 classname을 0으로 변경함
            newTodo.tag=0;                                    // 5. newTodo객체의 tag값을 0으로 변경함(PaintTodo시 분기문에 사용됨.)
            saveToDos(); //localStorage 업데이트

        }
        else{                                                 // 6. text에 취소선이 그어저있지 않은 상태라면(✅상태)
            event.target.innerText="⛔";                      // 7. 버튼을 체크상태(⛔)로 변경 
            span.innerHTML='<s>'+`${span.innerText}`+'</s>';  // 8. 취소선 등록
            event.target.parentNode.className="1";            // 9. li(target.parentNode)의 classname을 0으로 변경함
            newTodo.tag=1;                                    // 10. newTodo객체의 tag값을 1으로 변경함(PaintTodo시 분기문에 사용됨.)
            saveToDos(); //localStorage 업데이트
        }
    });
    
   }
/*DeleteToDo 함수 : 일정 삭제 버튼 클릭 시 해당 일정을 삭제함 */
function DeleteToDo(event) {
    const li = event.target.parentElement; 
    li.remove();                          //삭제되는 모습을 보여줌. 
    //ToDolist의 모든 time값과 삭제버튼이 속한 li의 id값을 비교하여 같으면 해당 일정을 ToDolist에서 제외 시킴
    ToDolist = ToDolist.filter((todo) => parseInt(todo.time) !== parseInt(li.id));  
    saveToDos(); //삭제후 localStorage 업데이트 
}



//seaveToDos 함수 : localStorage에 날짜별로 일정을 넣는 함수 
function saveToDos() {
    YMD = year + '-' + mon + '-' + DayOfChoice;       //현재 선택된 날짜를 받아옴.
    localStorage.setItem(YMD, JSON.stringify(ToDolist)); //로컬스토리지에 String 모양을 하고있는 array를 삽입하기.
}


/*handleTodoSubmit 함수 : input에 일정을 입력하고 enter 했을 때 일어나는 행동 */
function handleTodoSubmit(event) {
    event.preventDefault();       //submit은 기본 동작이 새로고침이므로 기본 동작을 막음.
    
    if(ToDolist.length > 12)      // 해당 날짜의 todo가 12개가 넘을 경우
    {
        alert('최대 개수 입니다.');
        return;
    }
    if (toDoInput.value === '') {  //값을 입력안했을경우
        alert('값을 입력해주세요.');
        return;
    }

    const newTodo = toDoInput.value; //1. input에 적힌 값을 받아옴.
    toDoInput.value = "";            //2. 엔터 클릭시 입력된것처럼 보이기위해 빈칸으로 변경

    const newTodoObj = {             //3. 객체 생성
        text: newTodo,               //4. text에 input에 적힌값을 넣음.
        time: Date.now(),            //5. 현재시간을 time값에 넣음
        id: YMD,                     //6. id에 현재일자를 넣음
        tag: 0                       //7. tag 설정
    };

    PaintToDo(newTodoObj);      // 객체를 PaintToDo함수를 통하여 그리기 
    ToDolist.push(newTodoObj);  //  ToDolist에 넣기 
    saveToDos();                // localStorage에 분류하여 넣기 
}
toDoForm.addEventListener("submit", handleTodoSubmit);




Day.addEventListener('click', (event) => {
    YMD = year + '-' + mon + '-' + DayOfChoice;
    selectTodo().forEach(PaintToDo);
});

add.addEventListener("click", ()=>
{
    if (toDoInput.value === '') {
        alert('값을 입력해주세요.');
        return;
    }
    
    if(ToDolist.length > 12)
    {
        alert('최대 개수 입니다.');
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
    if(window.confirm("해당 일자의 계획을 모두 삭제하시겠습니까?"))
    {
        localStorage.removeItem(YMD);
    }
    selectTodo().forEach(PaintToDo);
});


Allreset.addEventListener("click", (event)=>{
    if(window.confirm("달력의 모든 계획을 삭제하시겠습니까?"))
    {
        localStorage.clear();
    }
    selectTodo().forEach(PaintToDo);
});