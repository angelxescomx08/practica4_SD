var socket = io()

console.log(socket)

const aleatorio = (x) => Math.floor(Math.random() * (x + 1))
const r = new Reloj(aleatorio(23),aleatorio(59),aleatorio(59))
let t = 5000

window.onload = ()=>{
    const reloj = document.getElementById('reloj')
    r.hora()
    const intervalor = setInterval(()=>{
        reloj.innerHTML = r.formato_hora()
    },1000)
}

const portada = (imagen) => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    let img = new Image()
    img.src = imagen

    img.onload = () => {
        ctx.drawImage(img, 0, 0, img.width, img.height,
            0, 0, canvas.width, canvas.height);
    }
}

const pedir_portada = async () => {
    try{
        const res = await fetch('http://localhost:8000/libro')
        const datos = await res.json()
        if(datos === null){
            alert('Se debe reiniciar la sesión, ya no hay libros')
        }else{
            portada(datos.link)
        }
    }catch(error){
        console.log(error)
    }
}

pedir_portada()
socket.on('mandar_portada',(libro)=>{
    portada(libro.link)
})
socket.on('acabados',()=>{
    alert('Se han acabado los libros')
})

const peticion = async (url) => {
    try {
        const res = await fetch(url)
        const datos = await res.json()
        r.setH = datos.h
        r.setM = datos.m
        r.setS = datos.s
        t = datos.t*1000
    } catch (error) {
        console.log(error)
    }
}

setInterval(() => {
    peticion('http://localhost:8000/time')
}, t)

const cambiar_hora = ()=>{
    let hora = prompt('Ingrese hora en formato H:M:S')
    let h = hora.split(':')
    r.setH = parseInt(h[0])
    r.setM = parseInt(h[1])
    r.setS = parseInt(h[2])
}