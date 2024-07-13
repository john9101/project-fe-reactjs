import express, { Request, Response } from 'express';
import productsRouter from './src/routes/products.routes';
import categoryRouter from './src/routes/categories.routes';
import { config } from 'dotenv'
import mongoose, { Schema } from 'mongoose'
// @ts-ignore
import bodyParser from 'body-parser'
// @ts-ignore
import cors from "cors"
// @ts-ignore
import morgan from 'morgan'
import requiresRouter from "./src/routes/requires.routes";
import contactsRouter from "./src/routes/contacts.routes";
import axios from 'axios';
import informationRouter from './src/routes/user.routes';
import loginRouter from './src/routes/login.router';
config();
const app = express();
const port = process.env.PORT || 3000;
import { createServer } from "http";
import { Server } from "socket.io";
import registerRouter from './src/routes/register.router';

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.use('/api/products', productsRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/contacts', contactsRouter)
app.use('/api/requires', requiresRouter)
app.use('/api/users', informationRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.nlnlbxk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected...'))
    .catch(error => console.error('MongoDB connection error:', error));

// Endpoint to fetch provinces

// app.get('/api/provinces', async (req: Request, res: Response) => {
//     try {
//         const response = await axios.get('https://provinces.open-api.vn/api/');
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching provinces data' });
//     }
// });

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
