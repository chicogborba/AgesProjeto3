import express, { Request, Response } from 'express';
import SSEManager from './sseManager';

const router = express.Router();

// Rota para estabelecer a conexão SSE
export const conectSSE = async (req: Request, res: Response) => {
    const userCode = req.params.code;

    // Define o cabeçalho SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Função para enviar dados via SSE
    const sendSSE = (data: any) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Adiciona a conexão SSE usando o SSEManager
    SSEManager.addConnection(userCode, sendSSE);

    // Remove a conexão da lista quando a conexão é fechada
    req.on('close', () => {
        SSEManager.removeConnection(userCode);
    });
};

export const notifyUser = async (userCode: string, message: string) => {
    SSEManager.notify(userCode, message);
};

export default router;
