const express = require('express')
const app = express()
const puerto = process.env.PORT || 8002
const path = require('path')
const mysql = require('mysql2')
const fetch = require('node-fetch')
const {peticion}  = require('./public/js/peticiones')
const { insertar_central,insertar_equipo } = require('./public/js/t_consultas')

//es importante para fetch
app.use(express.urlencoded());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tiempo'
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'html', 'servidor_tiempo.html'))
})

app.post('/tiempo',(req,res)=>{
    const d = req.body.data
    peticion('http://localhost:8000/tiempo')
})

app.post('/central',(req,res)=>{
    const d = req.body.data
    insertar_central(connection,[[d.p,d.n]])
    res.json({})
})

app.post('/equipo',(req,res)=>{
    const d = req.body.data
    insertar_equipo(connection,[[d.l]])
    res.json({})
})

app.listen(puerto,()=>{
    console.log(`Escuchando en el puerto ${puerto}`)
})