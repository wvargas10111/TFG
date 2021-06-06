/* Este archivo contiene lo relacionado con la base de datos
 */

//Constante para establer una conexión con la base de datos
const mysql = require('mysql');

const conexion = mysql.createConnection({

    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'crud_nodejs'  

});

//Estabecemos la conexión con la base de datos
conexion.connect((error)=>{
    if (error) {
      console.error('El error de conexión es: ' + error);
      return;
    }
    console.log('¡Conectado a la Base de Datos!');
  });
module.exports = conexion;