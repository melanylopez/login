const fs = require('fs')

let moduloUsuarios = {
    archivo : './usuarios.json',
    leerJSON : function(){
        let usuarioLeido = fs.readFileSync(this.archivo, 'utf-8')
        let objetoUsuarios = JSON.parse(usuarioLeido)
        return objetoUsuarios
    },
    guardarJSON : function(info){
        let formatoJSON = JSON.stringify(info)
        fs.writeFileSync(this.archivo, formatoJSON, 'utf-8')
    },
    registrar : function(nombre, mail, contraseña){
        let listaUsuarios = this.leerJSON();
        let nuevoUsuario ={
            nombre : nombre,
            mail : mail,
            password : contraseña
        }
        listaUsuarios.push(nuevoUsuario)
        this.guardarJSON(listaUsuarios)
    },
    loguear : function(mail, contraseña){
        let listaUsuarios = this.leerJSON();
        let logueoUsuario = listaUsuarios.filter(usuario=>{
            return usuario.mail == mail && usuario.password == contraseña
        })
        return logueoUsuario
    },
    eliminar : function(mail, contraseña){
        let listaUsuarios = this.leerJSON();
        let nuevaLista = listaUsuarios.filter(usuario=>{
            return usuario.mail != mail && usuario.password != contraseña
        })
        this.guardarJSON(nuevaLista)
    }

}
module.exports = moduloUsuarios