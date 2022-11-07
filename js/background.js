

const images=["01.jpg","02.jpg","03.jpg"];


const chosenImage = images[Math.floor(Math.random() * images.length)];



const bgImage = document.createElement("img");
bgImage.src=`img/${chosenImage}`; // 여기까지하면 자바스크립트에만 img가 생성되 존재하므로
                                   //html의 body에 추가해주어야한다 

document.body.appendChild(bgImage); //body에 추가하는 부분 