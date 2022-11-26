const Day = document.querySelector(".day");
const month = document.querySelector('.month-name');
const date = new Date() //현재날짜 받아오기
/* */

let currentYear = date.getFullYear(); //년도 받아오기
let currentMon = date.getMonth()+1;   //0~11까지이므로 1더해야함.
let currentDay = date.getDate(); //현재 일자 받아오기

const input = document.querySelector('input[type="text"]');

 let year = currentYear;
 let mon = currentMon;

let DayOfChoice = currentDay;
let MonOfChoice = currentMon;
let yearOfChoice = currentYear;


let clickEventArr = []; //날짜를 선택한 li 객체를 담을 배열 

const today_title= document.querySelector('.today');

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
        
        DayOfheight(listPre,dayCount,getFirstDay);

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
            {   //Choice의 초기값은 currentYear로 위에 선언됨. 
                onlyOneList.style.border='3px solid red';
            }
            else{ //일치하지 않을 때 블랙 테두리
                onlyOneList.style.border='3px solid black';
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
                    onlyOneList.style.border = '3px solid black';
                }
            });

            DayOfheight(onlyOneList,dayCount,getFirstDay);

            Day.appendChild(onlyOneList);
            continue; //다음 for문을 돌림 
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

function DayOfheight(list,dayCount,firstDay){

    if((firstDay+7)%7+dayCount<=35)
    {
        return list.style.height='65px';
    }
    else{
        return list.style.height='55px';
    }
}


function setMonthTitle(year,mon)
{
    month.innerHTML=`${year}. ${mon}`;
}

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



function main()
{
    makeCalendar(year,mon,getDayOfMon(mon,year));
    setMonthTitle(year,mon);
    today_title.innerHTML=`Today... ${year}.${mon}.${DayOfChoice} `;
}

//Day는 ul의 클래스 이름
Day.addEventListener('click',(event)=>{
    
    if(event.target.tagName==='UL')return; // UL이아닌 LI를 클릭하였을때 해야함.
    if(event.target.className!=='disabled') //일자들을 눌렀을 때 
    {
        clearEvent(); // 앞에 선택된것 빨간색 된거 해제 
        today_title.textContent=`Today... ${year}.${mon}.${event.target.textContent} `;
        event.target.style.border='3px solid red'; //해당 일자를 레드로 변경
        DayOfChoice =event.target.innerHTML;        //
        MonOfChoice=mon;
        yearOfChoice=year;
        console.log(DayOfChoice);
        console.log(event.target);
        clickEventArr.push(event.target);
        input.focus();
        console.log(clickEventArr);
    }

});

function clearEvent()
{
    clickEventArr.forEach((value)=>{
        value.style.border='none';
    })
}

 export {year,mon,DayOfChoice, Day};//내보내기

main();


