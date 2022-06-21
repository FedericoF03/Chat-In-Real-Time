let link = document.getElementById("linkPrueba");
let registerConteinerPause = document.getElementById("ContRegPause")
let registerBoxPause = document.getElementById("ContRegPauseBox")
let spanPause = document.querySelector("span")
let ventanaEmerge;
let message = document.createElement("SPAN")
message.classList.add("r__s")
message.innerHTML = "En espera de que termine de registrarse";

link.addEventListener("click", ()=>{
    ventanaEmerge = window.open("./Register.html");
        setTimeout( ()=>{
            registerConteinerPause.classList.add("r__p__c");
            registerBoxPause.classList.add("r__p__b");
            registerBoxPause.appendChild(message)
        }, 500)
    check()
})

let check = ()=> {
    if (ventanaEmerge.closed != true) {
        setInterval( check ,2200)
    } else {
        registerConteinerPause.classList.remove("r__p__c");
        registerBoxPause.classList.remove("r__p__b");
        message.classList.remove("r__s")
        registerBoxPause.removeChild(message)
    }
}