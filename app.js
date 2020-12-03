const process = require('process')
let moduloUsuarios = require('./usuarios')

let comando = process.argv[2]

switch (comando) {

    case 'listar': //CASO AUXILIAR CREADO PARA COMPROBAR LA EJECUCION DE LOS METODOS- DESCOMENTAR
        let listaDeUsuarios = moduloUsuarios.leerJSON()
        listaDeUsuarios.forEach(usuario => {
            return console.log(usuario);
        })
        break; 

    case 'registro':
        let listaDUsuarios = moduloUsuarios.leerJSON()
        let buscador = JSON.stringify(listaDUsuarios)
        if (buscador.indexOf(process.argv[4]) == -1) {
            if (process.argv[4].includes('@') == true) {
                moduloUsuarios.registrar(process.argv[3], process.argv[4], process.argv[5])
                console.log(`
                Bienvenido a FORMAR ${process.argv[3]}! EXITOS!!
                Tu usuario fue creado correctamente.
                Ya podes iniciar sesión
                `);
                break;
            } else {
                console.log(`
                El mail debe incluir el caracter "@"
                `);
                break;
            }
        } else {
            console.log(`
            No podemos registrarlo
            Ya existe un usuario con este mail : ${process.argv[4]}
            `);
            break;
        }

    case 'login':
        let resultado = moduloUsuarios.loguear(process.argv[3], process.argv[4])
        if (resultado.length == 1) {
            console.log(`
            Bienvenido acaba de iniciado sesión
            `);
        } else {
            console.log(`
            No se pudo ingresar al usuario. Revise los datos por favor
            `)
        }
        break;
    case 'eliminar':
        let mail = process.argv[3]
        let contraseña = process.argv[4]
        let busqueda = moduloUsuarios.loguear(process.argv[3], process.argv[4])


        if (busqueda.length == 1) {
            moduloUsuarios.eliminar(mail, contraseña)
            console.log(`
            Lamentamos tu patida, esperamos volver a verte pronto.
            Atentamente el equipo de FORMAR
            `);
            setTimeout(function () {
                console.log(`
                Usuario eliminado
                `)
            }, 1500)
            break;
        } else {
            console.log(`
            No se pudo eliminar el usuaro. Revise los datos por favor
            `);
            break;
        }

}
