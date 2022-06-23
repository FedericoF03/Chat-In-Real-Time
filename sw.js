'use strict';

self.addEventListener("install", e=>{
    console.log("Se registro")
})


self.addEventListener("activate", e=>{
    console.log("Se activo deberia dejarte el fetch")
})

self.addEventListener("fetch", ()=> {
    console.log("llego?")
})

self.addEventListener("message", e=>{ 
    e.source.postMessage("e.data")
})
 