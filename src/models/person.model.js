const { v4: uuidv4 } = require('uuid');
let bd = require('../bd');

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(bd);
    });
};

const findById = (id) => {
    return new Promise((resolve, reject) => {
        const person = bd.find((person) => person.id === id);
        resolve(person);
    });
};

const create = (person) => {
    return new Promise((resolve, reject) => {
        const newPerson = {
            id: uuidv4(),
            ...person,
        };
        bd.push(newPerson);
        resolve(newPerson);
    });
};

const update = (id, person) => {
    return new Promise((resolve, reject) => {
        const index = bd.findIndex((p) => p.id === id);
        bd[index] = {id, ...person};
        resolve(bd[index]);
    })
};

const remove = (id) => {
    return new Promise((resolve, reject) => {
        bd = bd.filter((p) => p.id !== id);
        resolve();
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
