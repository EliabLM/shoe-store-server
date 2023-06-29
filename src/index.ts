import 'module-alias/register';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Database
import connectDB from '@database/db';

// Routes
import routerApi from '@routes/routes';

// Middlewares
import {
  boomErrorHandler,
  logError,
  errorHandler,
} from '@middlewares/error.handler';

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Servidor conectado');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Corriendo en puerto ' + PORT));
