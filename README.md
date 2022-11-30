# MyToDoList

## 1. 개요
> JS 기초와 웹기초를 하기위해 `노마드코더`의 바닐라 JS 강의를 듣고 TODO-LIST를 구현했다.<br>
  하지만 CSS와 HTML, JS 기초가  모두 부족하던 나는 구조를 어떻게 잡아야할지 막막 했지만.. 인터넷을 참고하며 Notion에 일일히 정리해가며 캘린더 기능까지 만들게 되었다.  <br>
  아직 많이 많이 부족하지만 대충 어떤식으로 흘러가는지 알게 된거 같다. 시간이 남들보다는 오래걸린 것 같지만<br>(자꾸 다른 기능을 추가하려는것때문에..) 끝까지 만들었다는것에 의의를 두며 
  <br> 다른 웹페이지와 기능들을 만들어가며 내 실력을 쌓아야겠다는 생각이 든 (자그마한) 프로젝트였다.
  
## 2. 동작 화면  
### 2.1 로그인 화면 
![ezgif com-gif-maker](https://user-images.githubusercontent.com/110041859/204739498-a0c74a24-d38a-4f50-b46a-d6c736ea185f.gif)

### 2.2 메인 화면
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/110041859/204740341-9703e368-fa1a-4938-bd67-b3361e1045df.gif)

### 3.2 Calender 사용


![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/110041859/204741567-de81f27e-d9a7-40ec-afb7-bd68567d4477.gif)


## 3. 인상깊었던 기술 Skil
### 3.1. 위치를 이용해 날씨 출력
* https://api.openweathermap.org 날씨 API를 활용하여 JSON을 으로 바꾼 뒤 원하는 정보를 추출함. <br>
* Geolocation API는 자바스크립트 프로그램이 사용자의 실제 위치를 브라우저에게 요청할 수 있도록 한다. <br>
  개인 정보와 연관되므로 브라우저는 Geolocation가 위치 정보에 접근 전 자바스크립트 프로그램이 사용자의 허락을 받아야한다. <br> 
 `Geolocation API`는 `navigator.gelocation`으로 정의되어 있다. 
 
 ```javascript 
 const lat = position.coords.latitude;
 const lng = position.coords.longitude;
 ``` 
 를 활용하여 현재 내위치를 받아오며 
 ```javascript
 navigator.geolocation.getCurrentPosition() 으로 사용자의 현재위치를 받아온다.
 ```
### 3.3 import와 export
* js 파일간에 변수와 객체등을 연결하기 위해 import와 export를 사용하였다.<br>
  하지만.. 로컬환경에서는 오류가 떴다
* 해당 오류가 일어난 이유는 모듈은 로컬파일에서 동작하지 않고 HTTP, HTTPS 프로토콜을 통해서만 가능하다.<br>
![image](https://user-images.githubusercontent.com/110041859/204747665-3ac0a347-8e2b-46a0-8c66-9e7f8aa1e343.png)
 -> 따라서 이를 해결하기 위해 라이브 서버를 사용했다<br>
 
❤ 라이브 서버란?
> 내 컴퓨터를 실제 서버처럼 작동시켜 웹 개발을 도와주는 확장 기능을 가지는 프로그램


## 4. 참고 사이트
* 캘린더는 https://github.com/kimtaejin3/Js_Calendar_And_ToDoList 를 참고해서 만들었다.(감사합니다)

