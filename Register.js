'use strict';

const inputUser = document.getElementById("username");
const inputPass = document.getElementById("password");
const inputEmail = document.getElementById("email");
const pRegister = document.getElementById("parrafoRegister");

export const IDBRequest = indexedDB.open("Accounts", 1);
IDBRequest.addEventListener("upgradeneeded", ()=>{
    const db = IDBRequest.result;
    db.createObjectStore("account", {
        autoIncrement: true
    });
})

document.addEventListener("click", e=>{
    if (e.target.matches("#register__button")) {
        e.preventDefault();
        addObject({Username: inputUser.value, Password: inputPass.value, Email: inputEmail.value});
        pRegister.textContent = "Successful registration";
        setTimeout(window.close, 2500);
    }
});

const addObject = objeto=> {
    const objectStore = dbTransaction("readwrite");
    objectStore.add(objeto);
}

export  const dbTransaction = (method)=>{
        const db = IDBRequest.result;
        const IDBtransaction = db.transaction("account", method);
        const objectStore = IDBtransaction.objectStore("account");
        return objectStore;
}
