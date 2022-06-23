if (navigator.serviceWorker) {
    navigator.serviceWorker.register("sw.js")
}
 
const chatBox = document.querySelector(".box__chat")
const inputChat = document.getElementById("chatInput")

inputChat.addEventListener("keyup", e => {
    if (e.keyCode == 13) {
        let result = creandoTexto()   
        if (inputChat.value != ""){
            navigator.serviceWorker.ready.then(res=>{
                chatBox.appendChild(result)
                res.active.postMessage(inputChat.value)
                inputChat.value = ""      
        })} 
    }
})

const IDBRequest = indexedDB.open("msg", 1);
IDBRequest.addEventListener("upgradeneeded", ()=>{
    const db = IDBRequest.result;
    db.createObjectStore("Mensajes",{
        autoIncrement: true
    })
})

navigator.serviceWorker.addEventListener("message", e=>{
    
    const readUsers = ()=>{
        const db = IDBRequest.result;
        const IDBtransaction = db.transaction("Mensajes","readonly")
        const objectStore = IDBtransaction.objectStore("Mensajes");
        const cursor = objectStore.openCursor()
        cursor.addEventListener("success", ()=>{
        cursor.result.value.msg
        let result = creandoTexto2(cursor.result.value.msg)
        console.log(result)
        chatBox.appendChild(result)
        })
    }
    readUsers()
    md({msg: e.data})
})




let creandoTexto = ()=>{
    const date = new Date;
    const chatOwner = document.createElement("DIV")
    chatOwner.classList.add("message__box__chat") 
    chatOwner.setAttribute("data-pre-plain-text", date.toLocaleString() )
    chatOwner.innerHTML = `<p class="message">${inputChat.value}</p>`
    return chatOwner
} 

const md = msg =>{
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("Mensajes","readwrite")
    const objectStore = IDBtransaction.objectStore("Mensajes");
    objectStore.add(msg)
    console.log(db)
    console.log(IDBtransaction)
}

let creandoTexto2 = (text)=>{
    const date = new Date;
    const chatOwner = document.createElement("DIV")
    chatOwner.classList.add("message__box") 
    chatOwner.setAttribute("data-pre-plain-text", date.toLocaleString() )
    chatOwner.innerHTML = `<p class="message">${text}</p>`
    return chatOwner
}