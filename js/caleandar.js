const Day = document.querySelector(".day");
const month = document.querySelector('.month-name');
const date = new Date();               //현재날짜 받아오기

/*왼쪽 오른쪽 화살표 변수 */
const pre = document.querySelector('.left');
const next = document.querySelector('.right');

let currentYear = date.getFullYear(); //현재 년도 받아오기
let currentMon = date.getMonth()+1;   //현재 달수 받아오기 (0~11까지이므로 1더해야함)
let currentDay = date.getDate();     //현재 일자 받아오기
// console.log(date.getDate());

const input = document.querySelector('input[type="text"]'); //input 
const today_title= document.querySelector('.today');        //today는 오른쪽위 h1


 let year = currentYear;          //년도(초기값은 현재년)
 let mon = currentMon;            //달 (초기값은 현재달)

let DayOfChoice = currentDay;     //선택한 일 (초기값은 현재일)
let MonOfChoice = currentMon;    // 선택한 달 (초기값은 현재달)
let yearOfChoice = currentYear;  //선택한 년 (초기값은 현재년)


let clickEventArr = [];          //날짜를 선택한 li 객체를 담을 배열 



/* isLeapYear 함수 : 윤년 검사 함수  */
function isLeapYear(year) //윤년검사 -> 연도가 4의 배수이면서 100의 배수가 아닐때와 연도가 400의 배수인 것
{
    return (year%4==0 && year%100!=0)|| (year%400==0) //윤년은 해당년도를 4를 나눈 값이 0일때 윤년이다.
}                                                  

  
/* getDayOfMon 함수 : 현재 년도의 각 달의 일수 판별 함수 */
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

/*getDay 함수 : 년원일을 매개변수로 받아 현재 일주일중 현재 요일(일0~6토)을 알려줌  */
function getDay(year,mon,date) 
{
    const conYMD=year+'-'+mon+'-'+date; 
    return (new Date(conYMD).getDay()); 
}


/*makeCalendar 함수 : 캘린더 생성함수*/
function makeCalendar(year,mon,dayCount)
{
    clickEventArr = [];
    Day.innerHTML='';                      // ul 초기화 
    let getFirstDay = getDay(year,mon,1);  // 이번달의 1일의 요일을 알아냄-> 
    let previousMon;                       //이전달

    if(currentMon-1 < 0)   //현재달에서 -1했을경우 0보다 작으면(즉 1월달(0)에서 -1해서 -1이나오면)
    {
        previousMon = 12;  // 이전달은 12월로 
    }
    else{
        previousMon = currentMon - 1; //아니라면 그냥 -1한 값을 이전달값으로 넣음
    }
    let getDayOfPreMon = getDayOfMon(previousMon,year); //저번달 일수가져오기 
    
    
    // 현재 달력 1일 이전의 남은 공간에 저번달 일수 표현 
    for(let i=(getFirstDay+7)%7; 0<i; i--){  //현재달의 1일의 요일을(0~6) 알아낸다음 +7한 후 오버나는수만큼 채움  
        const listPre = document.createElement('li'); // li 추가 
        listPre.textContent = `${getDayOfPreMon-(i-1)}`; // 
        listPre.style.opacity = '0.5'; //투명도
        listPre.classList.add('disabled');
        DayOfheight(listPre,dayCount,getFirstDay);    //6주 이상일 때 크기 조절 
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
            
            // 선택된 날짜와 현재 날짜가 같으면 border 설정 
            if(currentYear==yearOfChoice&&currentMon===MonOfChoice&&currentDay===DayOfChoice)
            {   //Choice의 초기값은 currentYear로 위에 선언됨. 
                onlyOneList.style.border='3px solid red';
            }
            else{ //일치하지 않을 때 블랙 테두리
                onlyOneList.style.border='3px solid orange';
            }

            //현재 날짜가 토요일이나, 일요일일 경우 
            if(0===getDay(year,mon,i)) // 현재 날짜가 일요일 일때
            {
                onlyOneList.style.color='red';
            }
            else if(6==getDay(year,mon,i)) // 토요일 일때
            {
                onlyOneList.style.color='blue'
                onlyOneList.style.marginRight ='0px';
            }
            // 현재날짜가 아닌 다른날짜 클릭 시 현재날짜 블랙테두리
            Day.addEventListener('click',(event)=>{
                if(event.target!==onlyOneList){
                    onlyOneList.style.border = '3px solid orange';
                }
            });

            DayOfheight(onlyOneList,dayCount,getFirstDay); //6주나왔을때 높이설정 
            Day.appendChild(onlyOneList);
            continue; //다음 for문을 돌림 (현재일은  위에서 생성했으므로 밑에서는 건너뛰어야함)
        }

        const list =document.createElement("li");
        list.textContent=`${i}`;
        //나머지 일수들은 border를 적용하지 않도록 하기 위함.
        if(i===DayOfChoice&&year===yearOfChoice&&mon===MonOfChoice)
        {
            list.style.border = '3px solid red';
            Day.addEventListener('click',(event)=>{
                if(event.target!==list)
                {
                    console.log(event.target,list);
                    list.style.border='none';

                }
            });
        }

        if(getDay(year,mon,i)===0)
        {
            list.style.color='red';
            
        }
        else if(getDay(year,mon,i)===6)
        {
            list.style.color='blue';
            list.style.marginRight ='0px';
        }
        DayOfheight(list,dayCount,getFirstDay);
        Day.appendChild(list);
    }
}
/*DayOfheight 함수 : 현재달에 표시된 일수가 35일이 넘으면 각 일자박스의 크기를 조절*/
function DayOfheight(list,dayCount,firstDay){

    if((firstDay+7)%7+dayCount<=35)
    {
        return list.style.height='65px';
    }
    else{
        return list.style.height='55px';
    }
}

/*setMonthTitle 함수 : 캘린더 위에 현재 년,월 표시 */
function setMonthTitle(year,mon)
{
    month.innerHTML=`${year}. ${getPadstart(mon)}`;
}

/* nextMonthOrYear 함수 : 오른쪽 화살표 클릭 했을때 */
function nextMonthOrYear()
{
    if(mon===12)
    {
        year = year+1;
        mon =1;
    }
    else{
        mon+=1;
    }
    setMonthTitle(year,mon);
    makeCalendar(year,mon,getDayOfMon(mon,year));
}
/* preMonthOrYear 함수 : 왼쪽 화살표 클릭 했을때 */
function preMonthOrYear()
{
    if(mon===1)
    {
        year = year-1;
        mon=12;
    }
    else{
        mon-=1;
    }
    setMonthTitle(year,mon);
    makeCalendar(year,mon,getDayOfMon(mon,year));
}

pre.addEventListener('click',preMonthOrYear);
next.addEventListener('click',nextMonthOrYear);





//Day는 ul의 이름
Day.addEventListener('click',(event)=>{
    if(event.target.tagName==='UL')return; // UL이아닌 LI를 클릭하였을때 해야함.
    if(event.target.className!=='disabled') //일자들을 눌렀을 때 
    {
        clearEvent(); // 앞에 선택된것 빨간색 된거 해제 
        today_title.textContent=`Today... ${year}.${ getPadstart(mon)}.${getPadstart(event.target.textContent)}`;
        event.target.style.border='3px solid red'; //해당 일자를 레드로 변경
        DayOfChoice =event.target.innerHTML;        // i
        MonOfChoice=mon;
        yearOfChoice=year;
        clickEventArr.push(event.target);
        input.focus(); //커서깜빡이게 변경
    }

});

function clearEvent()
{
    clickEventArr.forEach((value)=>{
        value.style.border='none';
    })
}
function main() //초기화면 메인 
{
    makeCalendar(year,mon,getDayOfMon(mon,year));
    setMonthTitle(year,mon);
    today_title.innerHTML=`Today... ${year}.${getPadstart(mon)}.${getPadstart(DayOfChoice)} `;
}

function getPadstart(DayOfmonChoice) 
{
    let DMchoice;
    if(String(DayOfmonChoice).length===1)
    {
        DMchoice=String(DayOfmonChoice).padStart(2,"0");
        console.log(DMchoice);
        return DMchoice
    }
    else{
        DMchoice=DayOfmonChoice
        return DMchoice;
    }
}

main();

 export {year,mon,DayOfChoice, Day}; //내보내기


