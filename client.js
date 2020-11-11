const Nes = require('@hapi/nes');

var client = new Nes.Client('ws://localhost:5000');

const start = async() => {
    await client.connect();

    const { payload: history } = await client.request({
        path: "history",
        method: "POST"
    });
    for (const message of history) {
        console.log(message);
    }

    client.subscribe('/message', (payload, flags) => {
        console.log(payload.message); // payload is the data published by the server
    });

    const messageToSend = process.argv.slice(2).join(" "); // allow to specify message from CLI
    await client.request({
        path: "message",
        method: "POST",
        payload: { message: messageToSend }
    });
};

start();