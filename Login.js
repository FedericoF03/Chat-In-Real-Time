'use strict';

document.addEventListener("click", e=>{
    
    if (e.target.matches("#register")) { 
        const openW = window.open("./Register.html", "__blank")
        setInterval(isOpenOrClosed, 500, openW)
    }
})




let isOpenOrClosed = (window)=>{
    if(!window.closed) console.log("abierto")
    else console.log("se cerro");
}