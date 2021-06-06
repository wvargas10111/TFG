//Constantes para uso de express
const express = require('express');
const app = express();
//Constante para rutas
const path = require('path');

app.set('view engine', 'ejs');

//Como capturamos los datos de la plantilla
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//Modulos estáticos
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log('SERVER corriendo en http://localhost:5000');
})