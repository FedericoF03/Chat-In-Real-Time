'use strict';

//Se piden Id's del index.html //

let link = document.getElementById("linkPrueba");
let registerConteinerPause = document.getElementById("ContRegPause")
let registerBoxPause = document.getElementById("ContRegPauseBox")
let spanPause = document.querySelector("span")
let ingress = document.getElementById("enviado")
let usuarioLogin = document.getElementById("usuarioCreator")
let contraseñaLogin = document.getElementById("contraseñaCreator")

//Creamos mensaje//

let message = document.createElement("SPAN")
message.classList.add("r__s")
message.innerHTML = "En espera de que termine de registrarse";

//Control de registro y ventana mediante evento click //
let ventanaEmerge;
link.addEventListener("click", ()=>{
    ventanaEmerge = window.open("./Register.html");
        setTimeout( ()=>{
            registerConteinerPause.classList.add("r__p__c");
            registerBoxPause.classList.add("r__p__b");
            registerBoxPause.appendChild(message)
        }, 500)
        
        let check = ()=>{
            if (!ventanaEmerge.closed) {
            } else if (ventanaEmerge.closed) {
                registerConteinerPause.classList.remove("r__p__c");
                registerBoxPause.classList.remove("r__p__b");
                message.remove()
                return clearInterval(prueba)
            }   
        }
        let prueba = setInterval(check, 2200)
})

//Pedimos abrir una db para leer el usuario //

const IDBRequest = indexedDB.open("Users", 1);
IDBRequest.addEventListener("upgradeneeded", ()=>{
    const db = IDBRequest.result;
    db.createObjectStore("usuarios",{
        autoIncrement: true
    })
})

const readUsers = ()=>{
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("usuarios","readonly")
    const objectStore = IDBtransaction.objectStore("usuarios");
    const cursor = objectStore.openCursor()
    
    cursor.addEventListener("success", ()=>{
        if (usuarioLogin.value == "" || contraseñaLogin.value == "") console.log("no se ingreso dato")
        else if (cursor.result.value.Usuario != usuarioLogin.value && cursor.result.value.Contraseña != contraseñaLogin.value) {
            cursor.result.continue()
        } else if (cursor.result.value.Usuario == usuarioLogin.value && cursor.result.value.Contraseña == contraseñaLogin.value) { 
            console.log("Usuario y contraseña correctas")
            window.open("./Chat.html", "_self")
        } 
    })
}

ingress.addEventListener("click", readUsers )