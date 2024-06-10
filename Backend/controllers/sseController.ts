// controllers/sseController.js
import { Request, Response } from "express";
let clients: any = [];

export const eventsHandler = (req: any, res: any) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };
    clients.push(newClient);

    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter((client: { id: number; }) => client.id !== clientId);
    });
};

export const sendMessage = (message: string) => {
    clients.forEach((client: { res: { write: (arg0: string) => any; }; }) => client.res.write(`data: ${JSON.stringify(message)}\n\n`));
};
