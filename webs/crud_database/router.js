const express = require('express');
const router = express.Router();

const conexion = require('./database/db');


router.get('/', (req, res) => {
    
    conexion.query('SELECT * FROM users',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('index.ejs', {results:results});         
        }   
    })
})

module.exports = router;

//Rutas para acceder a las diferentes plantillas

router.get('/inicio', (req,res)=>{
    res.render('inicio');
})
router.get('/create', (req,res)=>{
    res.render('create');
})
router.get('/america', (req,res)=>{
    res.render('america');
})
router.get('/europa', (req,res)=>{
    res.render('europa');
})
router.get('/africa', (req,res)=>{
    res.render('africa');
})
router.get('/asia', (req,res)=>{
    res.render('asia');
})
router.get('/oceania', (req,res)=>{
    res.render('oceania');
})
router.get('/conocenos', (req,res)=>{
    res.render('conocenos');
})
router.get('/incidencias', (req,res)=>{
    res.render('incidencias');
})
router.get('/todosdestino', (req,res)=>{
    res.render('todosdestino');
})
router.get('/brasil', (req,res)=>{
    res.render('brasil');
})
router.get('/peru', (req,res)=>{
    res.render('peru');
})

//Invocamos a los métodos del crud
const crud = require('./controllers/crud');

//Métodos para crear y actualizar
router.post('/save', crud.save);
router.post('/update', crud.update);

//Ruta para editar los registros
router.get('/edit/:id', (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM users WHERE id=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit', {user:results[0]});            
        }        
    });
});

//ruta para eliminar los registros 
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM users WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
    })
});

