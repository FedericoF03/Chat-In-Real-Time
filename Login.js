'use strict';

import { dbTransaction } from "./Register.js";

const $loginButton = document.getElementById("user__or__email");
const $passButton = document.getElementById("user__pass");
const $loginText = document.getElementById("login__text");
const $pauseConteiner = document.getElementById("pause__conteiner");
const $pauseBox = document.getElementById("pause__box");
const $pauseText = document.getElementById("pause__text");
$pauseBox.removeChild($pauseText);
const linkW = "./Register.html";

let isOpenOrClosed = (window)=>{
    let intervalClear = setInterval(() => {
        if (window.closed) {
            $pauseConteiner.classList.remove("pause__conteiner");
            $pauseBox.classList.remove("pause__box");
            $pauseBox.removeChild($pauseText);
            clearInterval(intervalClear);
        }    
    }, 500);
}

document.addEventListener("click", e=>{
    
    if (e.target.matches("#register")) { 
        const openW = window.open(linkW, "__blank");
        $pauseConteiner.classList.add("pause__conteiner");
        $pauseBox.classList.add("pause__box");
        $pauseText.innerHTML = "in registration process";
        $pauseBox.appendChild($pauseText);
        isOpenOrClosed(openW);
    }
    else if (e.target.matches("#button__Login")) {
        if ($loginButton.value != "" || $passButton.value != "") {
            readObject();
        } else {
            $loginText.style.display = "block";
            $loginText.innerHTML = "The sent data is empty";
        }
    }
})

document.addEventListener("keydown", (e)=>{
    if (e.keyCode == 13) {
        if ($loginButton.value != "" || $passButton.value != "") {
            readObject();
        } else {
            $loginText.style.display = "block"
            $loginText.innerHTML = "The sent data is empty";
        }
    }
})

const readObject = () =>{
    const objectStore = dbTransaction("readonly");
    const cursor = objectStore.openCursor();
    cursor.addEventListener("success", ()=>{
        if ((cursor.result.value.Username == $loginButton.value || cursor.result.value.Email == $loginButton.value) && cursor.result.value.Password == $passButton.value) window.open("./Chat.html", "_self");
        else cursor.result.continue();
    })
}