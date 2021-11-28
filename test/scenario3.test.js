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
    test('Should get invalid id', async () => {
        const res = await request.get('/person/123');

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ message: 'Invalid id' });
    });

    test('Should get not found id', async () => {
        const res = await request.get('/person/6bc7e0c8-529b-465b-a991-05eee17ffa4e');

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: 'Not found person' });
    });

    test('Should update invalid id', async () => {
        const res = await request
            .put('/person/123')
            .send(person.update);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ message: 'Invalid id' });
    });

    test('Should update not found id', async () => {
        const res = await request
            .put('/person/6bc7e0c8-529b-465b-a991-05eee17ffa4e')
            .send(person.update);

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: 'Not found person' });
    });

    test('Should delete invalid id', async () => {
        const res = await request.delete('/person/123');

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ message: 'Invalid id' });
    });

    test('Should delete not found id', async () => {
        const res = await request.delete('/person/6bc7e0c8-529b-465b-a991-05eee17ffa4e');

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: 'Not found person' });
    });
  });