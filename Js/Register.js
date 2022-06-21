let registerButton = document.getElementById("registerButton")
const userText = document.getElementById("usuario")
const pwText = document.getElementById("contraseña")
const emText = document.getElementById("correo")
let registerConteinerPause = document.getElementById("ContRegPause")
let registerBoxPause = document.getElementById("ContRegPauseBox")
let spanPause = document.querySelector("span")

const IDBRequest = indexedDB.open("Users", 1)

IDBRequest.addEventListener("upgradeneeded", ()=>{
    const db = IDBRequest.result;
    db.createObjectStore("usuarios", {
        autoIncrement: true
    })
})

const addUsers = user =>{
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("usuarios","readwrite")
    const objectStore = IDBtransaction.objectStore("usuarios");
    objectStore.add(user)
}

registerButton.addEventListener("click", ()=>{
    addUsers({
        "Usuario": userText.value,
        "Contraseña": pwText.value, 
        "Correo": emText.value
    })
    window.close()
})