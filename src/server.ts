import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);

AppDataSource.initialize().then(async()=> {
    console.log('Database connected');
    app.listen(3333, () => {
        console.log('Server start on port 3333');
    })
})