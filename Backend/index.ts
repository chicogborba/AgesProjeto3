import express from 'express'
import dotenv from 'dotenv';
import movieRoutes from './routes/moviesRoutes';
import postsRoutes from './routes/postsRoutes';
import userRoutes from './routes/userRoutes';
import arduinoRoutes from './routes/arduinoRoutes';
import sseRoutes from './routes/sseRoutes';
import cors from "cors"; // Importe o pacote CORS

// IDEIA : 
// Talvez utilizar o arduino com a placa ethernet para fazer um servidor local 
// que se comunique com o servidor e consiga usar infravermelho para controlar a tv
dotenv.config();
const app = express()

app.use(cors());
app.use(express.json());
app.use("/", movieRoutes);
app.use("/", postsRoutes);
app.use("/", userRoutes);
app.use("/", arduinoRoutes);
app.use("/", sseRoutes);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})