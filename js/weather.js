const API_KEY ="d80e14a749f124b97b90c1b5e0f3b5d2";

function onGeoOk(position)
{
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log(lat,lng);
    
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    
    fetch(url).then(response => response.json()).then(data =>{
        const weather= document.querySelector("#weater-quotes-div");
        const location_ment=document.querySelector("#weather span:first-child");
        const city= document.querySelector("#weather span:nth-child(2)");
        const temp =document.querySelector("#weather span:nth-child(3)");
        
        const weather_state=data.weather[0].main;
        
        
        const removeimg = document.getElementById("test"); //기본 물음표이미지 삭제하기위함
        weather.removeChild(removeimg);
        const wimg= document.createElement("img"); //기본이미지 삭제후 새로운 이미지 생성
        
        if (weather_state==="Clear")
        {
            // weather.innerText = "🌞";
            // weather.style.backgroundImage ="url('./loginimg/weather_img/sun.png')";
            wimg.src="./loginimg/weather_img/sun.png"
            weather.prepend(wimg);
            
        }
        else if(weather_state==="Clouds"){
            // weather.innerText = "☁" ;
            wimg.src="./loginimg/weather_img/cloud.png"
            weather.prepend(wimg);
        }
        /*추가할것 https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2*/ 
        
        location_ment.innerHTML="위치 :  "
        temp.innerHTML="온도 : " + data.main.temp + "˚C";
        const name= data.name;
        
        city.innerText=name;
    })

   // console.log(url);
//	console.log("니가 사는 곳은? ",lat,lng);
}
function onGeoError()
{
    alert("에러임");
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);
