const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql2')
const puerto = process.env.PORT || 8000
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const { consultar_libros, consultar_clientes, insertar_pedido} = require('./public/js/consultas')
const {peticion}  = require('./public/js/peticiones')
const libros = {"arr":[]}
const aleatorio = (x) => Math.floor(Math.random() * (x + 1))
let num = 0
let indice = aleatorio(4)
const url = 'http://localhost:8001/'
const cors = require('cors')
const Reloj = require('./public/js/relojServidor')

const r = new Reloj(aleatorio(23),aleatorio(59),aleatorio(59))
let t = 5

app.use(cors())
io.sockets.setMaxListeners(0);
//es importante para fetch
app.use(express.urlencoded());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'practica4'
})

consultar_libros(connection, libros.arr)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html', 'servidor1.html'))
})

app.get('/libro', (req, res) => {
    if (libros.arr.length > 0) {
        res.json(libros.arr[indice])
    } else {
        res.json(null)
    }
})

app.get('/pedir_libro', (req, res) => {
    if (libros.arr.length > 0) {
        let libro = libros.arr.splice(indice, 1)
        res.json(libro[0])
        num = libros.arr.length - 1
        indice = aleatorio(num, 1)
    } else {
        res.json(null)
    }
})

app.get('/jugador', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html', 'jugador.html'))
})

app.post('/tiempo',(req,res)=>{
    const d = req.body.data
    console.log('se ha pedido sincronizar')
    res.json(
        {
            h:r.getH,
            m:r.getM,
            s:r.getS
        }
    )
    r.setH = d.h
    r.setM = d.m
    r.setS = d.s
    t = d.t
})

app.get('/time',(req,res)=>{
    res.json(
        {
            h:r.getH,
            m:r.getM,
            s:r.getS,
            t: t
    })
})

io.on('connection', (socket) => {
    socket.setMaxListeners(0); 
    console.log('Un usuario se ha conectado');
    socket.on('cliente', () => {
        let ip = socket.handshake.address.split('::ffff:')[1]
        consultar_clientes(connection, ip)
        peticion(url+'cliente',{ip:ip})
    })
    socket.on('pedir_libro', ({ hora }) => {
        if (libros.arr.length > 0) {
            io.emit('mandar_portada', { "link": libros.arr[indice].link })
            let ip = socket.handshake.address.split('::ffff:')[1]
            let date = new Date()
            let fecha = ''
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            if (month < 10) {
                fecha = `${year}-0${month}-${day}`
            } else {
                fecha = `${year}-${month}-${day}`
            }
            insertar_pedido(connection, [[fecha, hora, libros.arr[indice].ISBN]], ip)
            peticion(url+'pedido',{fecha:fecha,hora:hora,libro: libros.arr[indice].ISBN,ip:ip})
        } else {
            io.emit('acabados')
        }
    })
    socket.on('reiniciar', () => {
        consultar_libros(connection, libros.arr)
        let num = 0
        let indice = aleatorio(4)
        setTimeout(()=>{
            io.emit('mandar_portada', { "link": libros.arr[indice].link })
            io.emit('reinicio')
        },500)
    })   
})

server.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`)
})