//Botones que responden a eventos o etiquetas creadas//
const registerButton = document.getElementById("registerButton");
const userText = document.getElementById("usuario");
const pwText = document.getElementById("contraseña");
const emText = document.getElementById("correo");
const registerConteinerPause = document.getElementById("ContRegPause");
const registerBoxPause = document.getElementById("ContRegPauseBox");
const spanPause = document.querySelector("span");
const parrafoRegister = document.getElementById("parrafoRegister");
const visibilityPassword = document.querySelector(".eyes");

// Se crea la db o abre en el caso de ya existir //
const IDBRequest = indexedDB.open("Users", 1)
IDBRequest.addEventListener("upgradeneeded", ()=>{
    const db = IDBRequest.result;
    db.createObjectStore("usuarios", {
        autoIncrement: true
    })
})

// Registro boton funcion agrega los datos a la db //
registerButton.addEventListener("click", ()=>{

    const addUsers = user =>{
        const db = IDBRequest.result;
        const IDBtransaction = db.transaction("usuarios","readwrite")
        const objectStore = IDBtransaction.objectStore("usuarios");
        objectStore.add(user)
    }

    addUsers({
        "Usuario": userText.value,
        "Contraseña": pwText.value, 
        "Correo": emText.value
    })
    parrafoRegister.innerText = "Se registro correctamente"
    setTimeout(()=> window.close(), 3000)
})

// Visibilidad de boton //
let vision = false;
visibilityPassword.addEventListener("click", ()=>{
    if (vision) {
        vision = false;
        pwText.setAttribute("type", "password");
        visibilityPassword.src = "./images/kisspng-computer-icons-password-blind-vector-5ae856af60c0e4.3327567715251759833963-removebg-preview.png";
    } else {
        vision = true;
        pwText.setAttribute("type", "text");
        visibilityPassword.src = "./images/file-svg-password-eye-icon-1168029-removebg-preview.png"
    }
    
})