const model = require('../models/person.model');
const { getReqData } = require('../utils');

const getAll = async (req, res) => {
    const persons = await model.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(persons));
};

const get = async (req, res, id) => {
    const person = await model.findById(id);

    if (person) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(person));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
};

const create = async (req, res) => {
    const body = await getReqData(req);
    const { name, age, hobbies } = JSON.parse(body);

    const newPerson = await model.create({ 
        name, 
        age, 
        hobbies,
    });

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newPerson));
};

const update = async (req, res, id) => {
    const person = await model.findById(id);

    if (person) {
        const body = await getReqData(req);
        const { name, age, hobbies } = JSON.parse(body);

        const updatePerson = await model.update({ 
            name, 
            age, 
            hobbies,
        });

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(updatePerson));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
};

const remove = async (req, res, id) => {
    const person = await model.findById(id);

    if (person) {
        await model.remove(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(person));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove,
};