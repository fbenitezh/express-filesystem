const express = require('express');
const app = express();
const port = 8080;
const Contenedor = require('./Contenedor');

app.get('/productos',async(req,res)=>{
    try {
        const contenedor = new Contenedor('./src/productos.txt');
        const productos = await contenedor.getAll();
        res.status(200).json({
            ok:true,
            productos
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error:error.message
        })
    }
});

app.get('/productoRandom',async(req,res)=>{
    try {
        const contenedor = new Contenedor('./src/productos.txt');
        const productos = await contenedor.getAll();
        let id_list_products = [];
        productos.map(prd=>id_list_products.push(prd.id));//guardo todos los id de los productos

        //obtengo un numero aleatorio entre 0 y n. Siendo n la longitud del array que contiene cada id de cada producto.
        const nroRandom = Math.floor( Math.random() * id_list_products.length );

        const productoRandom = await contenedor.getById(id_list_products[nroRandom]);

        res.status(200).json({
            ok:true,
            producto:productoRandom,
            nroRandom
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            error:error.message
        })
    }
});

const server = app.listen(port,()=>{
    console.log('server listening on port ' + port);
});
server.on('error',error=>console.log(error));
