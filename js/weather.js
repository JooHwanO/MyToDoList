const API_KEY ="d80e14a749f124b97b90c1b5e0f3b5d2";
function onGeoOk(position)
{
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    
    fetch(url).then(response => response.json()).then(data =>{
        const weather= document.querySelector("#weather span:first-child");
        const city= document.querySelector("#weather span:last-child");
        const weather_state=data.weather[0].main;
        if (weather_state==="Clear")
        {
            weather.innerText = "🌞";
        }
        else if(weather_state==="Clouds"){
            weather.innerText = "☁" ;
        }
        /*추가할것 https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2*/ 
        
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
