const socket = io()

socket.emit('cliente')

const aleatorio = (x) => Math.floor(Math.random() * (x + 1))
const r = new Reloj(aleatorio(23), aleatorio(59), aleatorio(59))
let t = 5000

window.onload = () => {
    const reloj = document.getElementById('reloj')
    r.hora()
    const intervalor = setInterval(() => {
        reloj.innerHTML = r.formato_hora()
    }, 1000)
}

const pedir_libro = async () => {
    try {
        const res = await fetch('http://localhost:8000/pedir_libro')
        const datos = await res.json()
        if (datos === null) {
            alert('Ya no quedan libros')
        } else {
            const isbn = document.getElementById('ISBN')
            const nombre = document.getElementById('libro')
            const autor = document.getElementById('autor')
            const editorial = document.getElementById('editorial')
            const precio = document.getElementById('precio')

            isbn.innerHTML = datos.ISBN
            nombre.innerHTML = datos.nombre
            autor.innerHTML = datos.autor
            editorial.innerHTML = datos.editorial
            precio.innerHTML = datos.precio
            socket.emit('pedir_libro', { "hora": r.formato_hora() })
        }

    } catch (error) {
        console.log(error)
    }
}

socket.on('acabados', () => {
    let opcion = window.confirm('Se han acabado los libros \n ¿Desea reiniciar sesion?');
    if (opcion) {
        socket.emit('reiniciar')
    }
})

socket.on('reinicio', () => {
    const isbn = document.getElementById('ISBN')
    const nombre = document.getElementById('libro')
    const autor = document.getElementById('autor')
    const editorial = document.getElementById('editorial')
    const precio = document.getElementById('precio')

    isbn.innerHTML = ''
    nombre.innerHTML = ''
    autor.innerHTML = ''
    editorial.innerHTML = ''
    precio.innerHTML = ''
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