const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql2')
const puerto = process.env.PORT || 8001
const { consultar_libros, consultar_clientes, insertar_pedido, consultar_pedidos} = require('./public/js/consultas')

//es importante para fetch
app.use(express.urlencoded());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'practica4_respaldo'
})

app.use(express.static(path.join(__dirname, 'public')))

app.post('/cliente',(req,res)=>{
    const d = req.body.data
    consultar_clientes(connection, d.ip)
})

app.post('/pedido',(req,res)=>{
    const d = req.body.data
    consultar_pedidos(connection,[[d.fecha,d.hora,d.libro]],d.ip)
})

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`)
})