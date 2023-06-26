import 'module-alias/register';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Database
import connectDB from '@database/db';
import routerApi from '@routes/routes';

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

routerApi(app);

app.get('/', (req, res) => {
  res.send('Servidor conectado');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Corriendo en puerto ' + PORT));
