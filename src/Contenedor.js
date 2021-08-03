const fs = require('fs');

class Contenedor{
    constructor(nameFile){
        this.nameFile = nameFile;
    }

    async save(data){
        try {      
            let contenido = await fs.promises.readFile(this.nameFile,'utf-8');
            data.id = 1;
            if(contenido != ""){
                contenido = JSON.parse(contenido);
                data.id = contenido[contenido.length - 1].id + 1;
            }
            let array = [...contenido,data];
            await fs.promises.writeFile(this.nameFile, JSON.stringify(array,null,2));
            console.log(`subido el producto ${data.title}`);
            return data.id;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id){
        try {
            let contentFile = await fs.promises.readFile(this.nameFile,'utf-8');
            if(contentFile == "") return [];   
            contentFile = JSON.parse(contentFile);
            let filtrado = contentFile.filter(item=>item.id == id);
            if(!filtrado.length) return null;
            return filtrado[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll(){
        try {
            let content = await fs.promises.readFile(this.nameFile,'utf-8');  
            if(content == "") return [];          
            return JSON.parse(content);
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id){
        try {
            let contentFile = await fs.promises.readFile(this.nameFile,'utf-8')
            if(contentFile == "") return 'Nada para eliminar';
            contentFile = JSON.parse(contentFile);
            let nuevoContenido = contentFile.filter(item=>item.id != id);
            await fs.promises.writeFile(this.nameFile,JSON.stringify(nuevoContenido,null,2));
            return;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAll(){
        await fs.promises.writeFile(this.nameFile,'');
        return;
    }

}


module.exports = Contenedor;