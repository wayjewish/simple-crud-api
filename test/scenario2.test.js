require('dotenv').config();
const supertest = require('supertest');
const request = supertest(`http://localhost:${process.env.PORT || 3000}`);

const person = {
    id: null,
    create: {
        name: 'test',
        age: 123,
        hobbies: ['q', 'w', 'e'],
    },
    update: {
        name: 'test2',
        age: 456,
        hobbies: ['r', 't', 'y'],
    },
};

describe('Scenario 2', () => {
    test('Should create invalid data - no name', async () => {
        const testPerson = { ...person.create };
        delete(testPerson.name);

        const res = await request
            .post('/person')
            .send(testPerson);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ message: 'Invalid data' });
    });

    test('Should create invalid data - no age', async () => {
        const testPerson = { ...person.create };
        delete(testPerson.age);

        const res = await request
            .post('/person')
            .send(testPerson);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ message: 'Invalid data' });
    });

    test('Should create valid data - no hobbies', async () => {
        const testPerson = { ...person.create };
        delete(testPerson.hobbies);

        const res = await request
            .post('/person')
            .send(testPerson);

        if (res.body.id) person.id = res.body.id;

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ 
            id: person.id,
            ...testPerson,
        });
    });

    test('Should update invalid data - no name', async () => {
        const testPerson = { ...person.update };
        delete(testPerson.name);

        const res = await request
            .put(`/person/${person.id}`)
            .send(testPerson);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ message: 'Invalid data' });
    });

    test('Should update invalid data - no age', async () => {
        const testPerson = { ...person.update };
        delete(testPerson.age);

        const res = await request
            .put(`/person/${person.id}`)
            .send(testPerson);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ message: 'Invalid data' });
    });

    test('Should update valid data - no hobbies', async () => {
        const testPerson = { ...person.update };
        delete(testPerson.hobbies);

        const res = await request
            .put(`/person/${person.id}`)
            .send(testPerson);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ 
            id: person.id,
            ...testPerson,
        });
    });

    test('Should delete person', async () => {
        const res = await request.delete(`/person/${person.id}`);

        expect(res.statusCode).toBe(204);
    });

    test('Should return no persons', async () => {
        const res = await request.get('/person');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });
  });