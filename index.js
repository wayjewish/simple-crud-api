const http = require('http');
require('dotenv').config();
const controller = require('./src/controllers/person.controller');

const PORT = process.env.PORT || 3000;

const server = http.createServer();

server.on('request', (req, res) => {
    switch (true) {
        case req.url === '/person':
            switch (req.method) {
                case 'GET':
                    controller.getAll(req, res);
                    break;
                case 'POST':
                    controller.create(req, res);
                    break;
                default:
                    res.statusCode = 404;
                    res.write('No such method');
                    res.end();
            }
            break;
        case req.url.match(/\/person\/\w+/) !== null:
            switch (req.method) {
                case 'GET': {
                    const id = req.url.split('/')[2];
                    controller.get(req, res, id);
                    break;
                }
                case 'PUT': {
                    const id = req.url.split('/')[2];
                    controller.update(req, res, id);
                    break;
                }
                case 'DELETE': {
                    const id = req.url.split('/')[2];
                    controller.remove(req, res, id);
                    break;
                }
                default:
                    res.statusCode = 404;
                    res.write('No such method');
                    res.end();
            }
            break;
        default:
          res.statusCode = 404;
          res.write('No such url');
          res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
