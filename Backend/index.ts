import express from 'express';
import dotenv from 'dotenv';
import movieRoutes from './routes/moviesRoutes';
import postsRoutes from './routes/postsRoutes';
import userRoutes from './routes/userRoutes';
import arduinoRoutes from './routes/arduinoRoutes';
import sseRoutes from './routes/sseRoutes';
import cors from 'cors'; // Importe o pacote CORS
import os from 'os'; // Importe o módulo OS

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", movieRoutes);
app.use("/", postsRoutes);
app.use("/", userRoutes);
app.use("/", arduinoRoutes);
app.use("/", sseRoutes);

app.listen(3000, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:3000`);
});
