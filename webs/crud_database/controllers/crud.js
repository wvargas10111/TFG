/* Este archivo almacena los controladores necesarios para la obtención de datos
 */

//Invocamos a la conexion de la DB
const conexion = require('../database/db');

//Guardar un registro dentro de la base de datos
exports.save = (req, res)=>{
    const user = req.body.user;
    const rol = req.body.rol;
    conexion.query('INSERT INTO users SET ?',{user:user, rol:rol}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/');         
        }
});
};

//Actualizar un registro dentro de la base de datos
exports.update = (req, res)=>{
    const id = req.body.id;
    const user = req.body.user;
    const rol = req.body.rol;
    conexion.query('UPDATE users SET ? WHERE id = ?',[{user:user, rol:rol}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
});
};