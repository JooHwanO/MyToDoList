const images=["COKE.gif"];
const chosenImage = images[Math.floor(Math.random() * images.length)];
const bdgImage = document.getElementById("main-img");
const loginimg1 = document.createElement("img");
loginimg1.src=`img/${chosenImage}`; // 여기까지하면 자바스크립트에만 img가 생성되 존재하므로
                                   //html의 body에 추가해주어야한다 
bdgImage.appendChild(loginimg1); //body에 추가하는 부분 

