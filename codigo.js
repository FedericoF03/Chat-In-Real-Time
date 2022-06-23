if (navigator.serviceWorker) {
    navigator.serviceWorker.register("sw.js")
}
 
const chatBox = document.querySelector(".box__chat")
const inputChat = document.getElementById("chatInput")

inputChat.addEventListener("keyup", e => {
    if (e.keyCode == 13) {
        let result = creandoTexto()   
        if (inputChat.value != ""){
            navigator.serviceWorker.ready.then(()=>{
                chatBox.appendChild(result)
                inputChat.value = ""
        })} 
    }
})

navigator.serviceWorker.addEventListener("message", e=>{
    console.log(e)
        creandoTexto2()
})


let creandoTexto = ()=>{
    const date = new Date;
    const chatOwner = document.createElement("DIV")
    chatOwner.classList.add("message__box__chat") 
    chatOwner.setAttribute("data-pre-plain-text", date.toLocaleString() )
    chatOwner.innerHTML = `<p class="message">${inputChat.value}</p>`
    return chatOwner
} 

let creandoTexto2 = ()=>{
    const date = new Date;
    const chatOwner = document.createElement("DIV")
    chatOwner.classList.add("message__box") 
    chatOwner.setAttribute("data-pre-plain-text", date.toLocaleString() )
    chatOwner.innerHTML = `<p class="message">${inputChat.value}</p>`
    return chatOwner
}