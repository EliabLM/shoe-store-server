import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Database
import connectDB from './database/db';
import routerApi from './routes';

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

routerApi(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Corriendo en puerto ' + PORT));
