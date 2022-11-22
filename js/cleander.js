const Day = document.querySelector(".day");
const month = document.querySelector('.month-name');
const date = new Date() //현재날짜 받아오기
/* */

let currentYear = date.getFullYear(); //년도 받아오기
let currentMon = date.getMonth()+1;   //0~11까지이므로 1더해야함.
let currentDay = date.getDate(); //현재 일자 받아오기

let year = currentYear;
let mon = currentMon;

let DayOfChoice = currentDay;
let MonOfChoice = currentMon;
let yearOfChoice = currentYear;


let clickEventArr = [];
let storeToDo = [];


/*왼쪽 오른쪽 화살표 변수 */
const pre = document.querySelector('.left');
const next = document.querySelector('.right');



/* 윤년 검사 함수  */
function isLeapYear(year) //윤년검사 -> 연도가 4의 배수이면서 100의 배수가 아닐때와 연도가 400의 배수인 것
{
    return (year%4==0 && year%100!=0)|| (year%400==0) //윤년은 해당년도를 4를 나눈 값이 0일때 윤년이다.
}                                                  

  
/*달의 일수 판별 함수 */
function getDayOfMon(mon, year)
{
    if(mon===1||mon===3||mon===5||mon===7||mon===8||mon===10||mon===12) //1,3,5,7,8,10,12월은 31일까지
    {
        return 31;
    }
    else if(mon===2)      //2월은
    {
        return (isLeapYear(year) ? 29 : 28 ); //윤년검사를 통해 29일과 28을 결정함 
    }
    else{
        return 30;  //나머지 월은 30일
    }
}

/*년월일  */
function getDay(year,mon,date) //년월일을 매개변수로 받아
{
    const conYMD=year+'-'+mon+'-'+date; //합친 후 
    return (new Date(conYMD).getDay()); //현재 요일을 알려줌!!! 
}



function makeCalendar(year,mon,dayCount)
{
    clickEventArr=[];
    Day.innerHTML=''; 
    let getFirstDay = getDay(year,mon,1); //이번달의 1일의 요일을 알아냄 (중요)
    let previousMon; //이전달

    if(currentMon-1 < 0) //현재달에서 -1했을경우 0보다 작으면(즉 1월달(0)에서 -1해서 -1이나오면)
    {
        previousMon = 12; // 이전달은 12월로 
    }
    else{
        previousMon = currentMon - 1; //아니라면 그냥 -1한 값을 이전달값으로 넣음
    }

    let getDayOfPreMon = getDayOfMon(previousMon,year); //저번달 일수가져오기 
    
    
    // 달력에 저번달 일수 표현 
    for(let i=(getFirstDay+7)%7; 0<i; i--){  //현재달의 1일의 요일을(0~6) 알아낸다음 +7한 후 오버나는수만큼 채움  
        const listPre = document.createElement('li'); // li 추가 
        listPre.textContent = `${getDayOfPreMon-(i-1)}`; // 
        listPre.style.opacity = '0.5'; //투명도
        listPre.classList.add('disabled');
        Day.appendChild(listPre); //달력의 첫부분에 넣음  
    }

    // 현재 달에 일수 그리기 
    for(let i=1; i<=dayCount; i++)
    {
        if(i===currentDay&& year===currentYear&&mon===currentMon) //현재 날짜(일자)에 맞을 때
        {
            //현재 날짜가 아닌 다른 날짜를 클릭하였을때 현재날짜에 검은색 테두리 표시하기  
            const onlyOneList = document.createElement('li');
            onlyOneList.textContent =`${i}`; // 현재날짜를 li에 넣음.
            //밑의 if문은 마우스로 클릭한 날짜가 현재날짜와 일치할때
            if(currentYear==yearOfChoice&&currentMon===MonOfChoice&&currentDay===DayOfChoice)
            {   
                onlyOneList.style.border='3px solid red';
            }
            else{ //일치하지 않을 때 블랙 테두리
                onlyOneList.style.border='3px solid black';
            }
            //---------------------------------------------------------------------

            if(0===getDay(year,mon,i)) // 현재 날짜가 일요일 일때
            {
                onlyOneList.style.color='red';
            }
            else if(6==getDay(year,mon,i)) // 토요일 일때
            {
                onlyOneList.style.color='blue'
            }
            
            Day.addEventListener('click', (event)=>{
                if(event.target!==onlyOneList) //클릭한 것이 현재날짜와 다르다면 블랙유지
                {
                    onlyOneList.style.border = '3px solid black';
                }
            });
            
            Day.appendChild(onlyOneList);
            continue; //for문을 벗어남 
        }
    }
}
makeCalendar(2022,11,1);



