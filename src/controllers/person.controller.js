const { validate: validId } = require('uuid');
const model = require('../models/person.model');
const { getReqData, validReqData } = require('../utils');

const getAll = async (req, res) => {
    try {
        const persons = await model.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(persons));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Something went wrong' }));
    }
};

const get = async (req, res, id) => {
    try {
        if (!validId(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Invalid id' }));
            return;
        }

        const person = await model.findById(id);

        if (!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not found person' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(person));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Something went wrong' }));
    }
};

const create = async (req, res) => {
    try {
        const body = await getReqData(req);
        if (!validReqData(body)) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Invalid data' }));
            return;
        }

        const { name, age, hobbies } = JSON.parse(body);
        const newPerson = await model.create({ 
            name, 
            age, 
            hobbies,
        });

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newPerson));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Something went wrong' }));
    }
};

const update = async (req, res, id) => {
    try {
        if (!validId(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Invalid id' }));
            return;
        }

        const person = await model.findById(id);
        if (!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not found person' }));
            return;
        }

        const body = await getReqData(req);
        if (!validReqData(body)) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Invalid data' }));
            return;
        }

        const { name, age, hobbies } = JSON.parse(body);
        const updatePerson = await model.update(id, { 
            name, 
            age, 
            hobbies,
        });

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(updatePerson));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Something went wrong' }));
    }
};

const remove = async (req, res, id) => {
    try {
        if (!validId(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Invalid id' }));
            return;
        }

        const person = await model.findById(id);
        if (!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not found person' }));
            return;
        }

        await model.remove(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(person));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Something went wrong' }));
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove,
};