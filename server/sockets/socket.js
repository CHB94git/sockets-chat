const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { createMessage } = require('../utils/utilidades')

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarAlChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);

        usuarios.addPerson(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listPersons', usuarios.getPersonsByRoom(data.sala));

        callback(usuarios.getPersonsByRoom(data.sala));
    });


    client.on('mensaje', (data) => {
        let persona = usuarios.getPerson(client.id);

        let mensaje = createMessage(persona.name, data.mensaje);
        client.broadcast.to(persona.sala).emit('mensaje', mensaje)
    });


    client.on('disconnect', () => {
        let erasedPerson = usuarios.erasePerson(client.id);

        client.broadcast.to(erasedPerson.sala).emit('mensaje', createMessage(
            'Administrador',
            `${erasedPerson.name} ha abandonado el chat`
        ));

        client.broadcast.to(erasedPerson.sala).emit('listPersons', usuarios.getPersonsByRoom(erasedPerson.sala));

    })


    client.on('privateMessage', data => {
        let person = usuarios.getPerson(client.id);

        client.broadcast.to(data.para).emit('privateMessage', createMessage(person.name, data.mensaje));
    })

});