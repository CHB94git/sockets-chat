var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('entrarAlChat', usuario, (resp) => {
        console.log('Usuarios conectados', resp)
    })
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('mensaje', function (mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchar cambios de usuarios cuando un usuario entra o sale del chat
socket.on('listPersons', (personas) => {
    console.log(personas)
});

// Mensajes privados
socket.on('privateMessage', function (message) {
    console.log('Mensaje privado: ', message);
});