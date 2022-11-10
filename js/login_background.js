


const login_image=["귀를기울이면.gif","LOVE.gif","LP.gif","man.gif","SIGA2.gif","so.gif"];

const chosenImage = login_image[Math.floor(Math.random() * login_image.length)];
const mainselect=document.getElementById("logo_image")
console.log(mainselect);
const loginimg = document.createElement("img");
loginimg.src=`loginimg/${chosenImage}`;

mainselect.appendChild(loginimg); //메인찾기 (쿼리셀렉터는 하나의 값만 가져옴)

