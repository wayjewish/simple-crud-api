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

describe('Scenario 1', () => {
    test('Should return no persons', async () => {
        const res = await request.get('/person');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('Should create person', async () => {
        const res = await request
            .post('/person')
            .send(person.create);

        if (res.body.id) person.id = res.body.id;

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ 
            id: person.id,
            ...person.create,
        });
    });

    test('Should get person', async () => {
        const res = await request.get(`/person/${person.id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ 
            id: person.id,
            ...person.create,
        });
    });

    test('Should update person', async () => {
        const res = await request
            .put(`/person/${person.id}`)
            .send(person.update);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            id: person.id,
            ...person.update,
        });
    });

    test('Should delete person', async () => {
        const res = await request.delete(`/person/${person.id}`);

        expect(res.statusCode).toBe(204);
    });

    test('Should find no person', async () => {
        const res = await request.get(`/person/${person.id}`);

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: 'Not found person' });
    });
  });