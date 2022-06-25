'use strict';

import {dbTransaction} from "./Register.js"
const $loginButton = document.getElementById("user__or__email")
const $passButton = document.getElementById("user__pass")
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
            $pauseBox.removeChild($pauseText)
            clearInterval(intervalClear)
        }    
    }, 500);
}

document.addEventListener("click", e=>{
    if (e.target.matches("#register")) { 
        const openW = window.open(linkW, "__blank");
        $pauseConteiner.classList.add("pause__conteiner");
        $pauseBox.classList.add("pause__box");
        $pauseBox.appendChild($pauseText);
        isOpenOrClosed(openW);
    }
    else if (e.target.matches("#button__Login")) {
        const promise = new Promise((resolve, reject)=> {
            if($loginButton.value != "") resolve()
            else reject("No tiene valor insertar texto")
        })
        promise
            .then((res)=>{
                console.log("contraseña correcta")
                
            })
            .catch((e)=>{
                console.log("Error:",e)
            })
    }
})






