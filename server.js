const Hapi = require('@hapi/hapi');
const Nes = require('@hapi/nes');
const Path = require('path');
var Inert = require('inert');

const server = new Hapi.Server({
    port: 5000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'view')
        }
    }
});

const history = [];

const start = async() => {

    await server.register([Nes, Inert]);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {

            directory: { path: '.' }
        }
    });

    server.route({
        method: 'POST',
        path: '/message',
        config: {
            id: 'message',
            handler: (request, h) => {
                const message = request.payload.message;
                console.log(`Message received: ${message}`);
                history.push(message);

                server.publish("/message", { message }); // publish the message to the clients
                return true;
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/history',
        config: {
            id: 'history',
            handler: (request, h) => {
                return history;
            }
        }
    });

    server.subscription('/message'); // declaring the subscription path


    await server.start();
    server.broadcast('hi');

    // console.log('server', server.eachSocket());
};

start();