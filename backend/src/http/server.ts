import express from 'express';
import routes from '../routes/routes';
import { consumer } from '../jobs/consumer';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333,async()=>{
    console.log('Server is running on port 3333')
    consumer();
});