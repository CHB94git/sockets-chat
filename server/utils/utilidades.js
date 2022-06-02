const createMessage = (name, msg) => {

    return {
        nombre: name,
        mensaje: msg,
        fecha: new Date().getTime()
    }
}

module.exports = {
    createMessage
}