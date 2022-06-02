

class Usuarios {

    constructor() {
        this.persons = [];
    }

    addPerson (id, name, room) {
        let person = { id, name, room };

        this.persons.push(person);

        return this.persons;
    }

    getPerson (id) {
        let person = this.persons.filter(p => p.id === id)[0];

        return person;
    }

    getPersons () {
        return this.persons;
    }

    getPersonsByRoom (room) {
        let personsInRoom = this.persons.filter(p => p.room === room);
        return personsInRoom;
    }

    erasePerson (id) {
        let erasedPerson = this.getPerson(id);

        this.persons = this.persons.filter(p => p.id !== id);

        return erasedPerson;
    }

}


module.exports = {
    Usuarios
}