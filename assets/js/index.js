const loginForm = document.querySelector(".login_form .form");
const loginInput = document.querySelector(".login_form .form input");
const greetingsTitle = document.querySelector(".login_form .user_name");
const bookAnimation = document.querySelector(".book_cover")

const USERNAME_KEY = "userName"
const ON_CLASS = "on";

function saveNameHandler(newLoginInput) {
   localStorage.setItem(USERNAME_KEY, newLoginInput);
}

function greetingsHandler(newLoginInput) {
   greetingsTitle.innerText = `${newLoginInput}"s Diary`;
}

function openAniHandler() {
   bookAnimation.classList.add(ON_CLASS);
   bookAnimation.style.left = "60%"
}

function loginHandler(e) {
   e.preventDefault();
   if (loginInput.value == "") {
      alert("What your name?")
   } else {
      loginForm.classList.add(ON_CLASS);
      const newLoginInput = loginInput.value;
      saveNameHandler(newLoginInput);
      greetingsHandler(newLoginInput);
      openAniHandler();
      loginInput.value = "";
   }
}

const savedNameHandler = localStorage.getItem(USERNAME_KEY);

if (savedNameHandler !== null) {
   greetingsHandler(savedNameHandler);
   openAniHandler();
   loginForm.classList.add(ON_CLASS);
} else {
   bookAnimation.classList.remove(ON_CLASS);
   bookAnimation.style.left = "50%"
   loginForm.classList.remove(ON_CLASS);
}

loginForm.addEventListener("submit", loginHandler);


const toDoForm = document.querySelector(".book_page .toDoForm");
const toDoInput = document.querySelector(".book_page .toDoForm input");
const list = document.querySelector(".list");

const TODO_KEY = "toDoItem";
let newToDoItem = [];

function saveTodoHenalder() {
   localStorage.setItem(TODO_KEY, JSON.stringify(newToDoItem))
}

function makeToDoHandler(toDoObj) {
   const li = document.createElement("li");
   li.id = toDoObj.id
   const listHtml = `<span>${toDoObj.item}</span>
                           <button class="btn del">X</button>`
   li.innerHTML = listHtml;
   list.append(li);
   document.querySelectorAll(".btn.del").forEach(btn => {
      btn.addEventListener("click", delToDoHandler)
   });
}

function delToDoHandler(e) {
   const li = e.target.parentNode;
   li.remove();
   newToDoItem = newToDoItem.filter((item) => item.id !== parseInt(li.id));
   saveTodoHenalder();
}

function toDoHandler(e) {
   e.preventDefault();
   if (toDoInput == "") {
      alert("내용을 입력해주세요");
   } else if (newToDoItem.length > 18) {
      alert("MAX LIST");
   } else {
      const newTodoItemInput = toDoInput.value;
      toDoInput.value = "";
      const toDoObj = {
         id: Date.now(),
         item: newTodoItemInput,
      };
      newToDoItem.push(toDoObj);
      makeToDoHandler(toDoObj)
      saveTodoHenalder();
   }
}

const savedTodoHandler = localStorage.getItem(TODO_KEY);

if (savedTodoHandler !== null) {
   const transToDo = JSON.parse(savedTodoHandler);
   newToDoItem = transToDo;
   transToDo.forEach(makeToDoHandler);
}

toDoForm.addEventListener("submit", toDoHandler);

function rdmBgHandler(){
   const img = document.createElement("img");
   const imgUrl = ["bg01","bg02","bg03"];
   const random = Math.floor(Math.random() * imgUrl.length);
   img.src = `./assets/img/${imgUrl[random]}.jpg`
   img.classList.add("bg")
   document.body.append(img)
}
rdmBgHandler();

function rdmSticker(){
   const sticker = document.querySelectorAll('figure img');
   const stickerUrl = ["sticker01","sticker02","sticker03","sticker04","sticker05"];

   sticker.forEach(item => {
      const random = Math.floor(Math.random() * stickerUrl.length);
      console.log(random)
      item.src = `./assets/img/${stickerUrl[random]}.png`
   });
};

rdmSticker();
setInterval(rdmSticker, 3000);


const timeText = document.querySelector('.fst_page p');

function updateTimeHandler(){
   const date = new Date();
   const years = date.getFullYear();
   const month = String(date.getMonth() +1).padStart(2, "0")
   const day = String(date.getDate()).padStart(2, "0")
   const hour = String(date.getHours()).padStart(2, "0")
   const min = String(date.getMinutes()).padStart(2, "0")
   const sec = String(date.getSeconds()).padStart(2, "0")
   timeText.innerText = `${years}년 ${month}월 ${day}일 ${hour}시 ${min}분 ${sec}초`
}
updateTimeHandler();
setInterval(updateTimeHandler, 1000);

const API_KEY = 'd706ed46f9d5e2f6bfef65c9c73e9f77'

function onGeoOk(position) {
   console.log(position)
   const lat = position.coords.latitude;
   const lng = position.coords.longitude;
   console.log('ok')
   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
   fetch(url)
      .then((response) => response.json())
      .then((data) => {
         const weather = document.querySelector('.weather');
         weather.innerText = `${data.name} ${data.weather[0].main} / ${data.main.temp}`;
      });
}

function onGeoError() {
   console.log('error')
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

