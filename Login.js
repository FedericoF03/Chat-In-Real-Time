'use strict';

import {dbTransaction, IDBRequest} from "./Register.js"
const $loginButton = document.getElementById("user__or__email");
const $passButton = document.getElementById("user__pass");
const $loginText = document.getElementById("login__text")
const $loginText2 = document.getElementById("login__text2")
const $pauseConteiner = document.getElementById("pause__conteiner");
const $pauseBox = document.getElementById("pause__box");
const $pauseText = document.getElementById("pause__text");
$pauseBox.removeChild($pauseText);
const linkW = "./Register.html"

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
        $pauseText.innerHTML = "in registration process"
        $pauseBox.appendChild($pauseText);
        isOpenOrClosed(openW);
    }
    else if (e.target.matches("#button__Login")) {
        if ($loginButton.value != "" || $passButton.value != "") {
            readObject()
        } else {
            $loginText.style.display = "block"
            $loginText.innerHTML = "Your Password or Username/Email is incorrect";
        }
    }
})

const readObject = () =>{
   const objectStore = dbTransaction("readonly")
    const cursor = objectStore.openCursor();
    cursor.addEventListener("success", ()=>{
        const promise = new Promise((resolve, reject)=>{
            if($loginButton.value == cursor.result.value.Username || $loginButton.value == cursor.result.value.Email) resolve(cursor.result.value.Password)
            else if ($loginButton.value != cursor.result.value.Username && $loginButton.value != cursor.result.value.Email) reject()
        })
        promise
                .then(()=>{
                    passwCheck(cursor.result.value.Password)
                })
                .catch(e=>{
                    passwCheck(cursor.result.value.Password)
                    $loginText.style.margin = "2px"
                    $loginText.style.display = "block"
                    $loginText.innerHTML = "Incorrect Username or Email"})
    })
}

const passwCheck = (parametro)=>{
    const promise = new Promise((resolve, reject) => {
        if($passButton.value == parametro) resolve()
        else reject()
    })
    promise
            .then(()=>{
                window.open("./Chat.html", "_self")
            })
            .catch(()=> {
            $loginText2.style.margin = "2px"
            $loginText2.style.display = "block"
            $loginText2.innerHTML = "Incorrect password"})
}