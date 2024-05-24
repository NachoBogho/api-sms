import express from 'express';
import bodyParser from 'body-parser';
import smsRouter from './routers/smsRouter.js';

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.use('/api', smsRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
