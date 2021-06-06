/* Este archivo configura nuestro servidor
 */

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
//Establecemos el puerto 5000 como acceso local para la salida de datos
app.listen(5000, ()=>{
    console.log('SERVER corriendo en http://localhost:5000');//Por consola mostramos este mensaje para verificar la conexión
})