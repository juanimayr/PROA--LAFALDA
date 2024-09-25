// Librerias
const express = require('express')
const ejs = require('ejs')
const arrayEmpleados = require('./seedEmpleados')

// Server config
const app = express()
const puerto = 3000
app.set('view engine', 'ejs')

// Path configs (configuracion para no poner ./views/archivo.ejs) 
const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

// Rutas
app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.get('/formularios', (req,res)=>{
    res.render('forms/formularios')
})

app.get('/formularios/new', (req,res)=>{
    res.render('forms/new')
})

app.get('/empleados', (req, res)=>{
    res.render('empls/empleados', {arrayEmpleados})
})

app.get('/empleados/:id', (req,res)=>{
    const id = req.params.id
    const empleado = arrayEmpleados[id]
    res.render('empls/empleado', {empleado})
})

app.get('/home', (req,res)=>{
    res.render('home')
})

app.listen(puerto, ()=>{
    console.log('Servidor abierto')
    console.log(puerto)
})