import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

// Array para armazenar conexões SSE ativas
let sseConnections: ((data: any) => void)[] = [];

// Rota para estabelecer a conexão SSE
export const conectSSE = async (req: Request, res: Response) => {
  // Define o cabeçalho SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Função para enviar dados via SSE
  const sendSSE = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Adiciona a conexão SSE à lista de conexões ativas
  sseConnections.push(sendSSE);

  // Remove a conexão da lista quando a conexão é fechada
  req.on('close', () => {
    sseConnections = sseConnections.filter(conn => conn !== sendSSE);
  });
};

// Função para enviar dados para todas as conexões SSE ativas
const sendToAllSSE = (data: any) => {
  sseConnections.forEach(sendSSE => sendSSE(data));
  console.log(sseConnections)
};

// Função que recebe uma string e envia para todas as conexões SSE ativas
export const sendDataToSSE = (data: any) => {
  sendToAllSSE(data);
};


export default router;
