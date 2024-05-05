import express from 'express'
import dotenv from 'dotenv';
import movieRoutes from './routes/moviesRoutes';
import postsRoutes from './routes/postsRoutes';
import registerLoginRoutes from './routes/registerLoginRoutes';


dotenv.config();
const app = express()

app.use(express.json());
app.use("/", movieRoutes);
app.use("/", postsRoutes);
app.use("/", registerLoginRoutes);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})