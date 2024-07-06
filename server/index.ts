import express, { Request, Response } from 'express';
import productsRouter from './src/routes/products.routes';
import categoryRouter from './src/routes/categories.routes';
import informationRouter from './src/routes/user.routes';
import loginRouter from './src/routes/login.router';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from "cors";
import morgan from 'morgan';
import contactsRouter from "./src/routes/contacts.routes";
import axios from 'axios';

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.use('/api/products', productsRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', informationRouter);
app.use('/api/login', loginRouter);
app.use('/api/contacts', contactsRouter);

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.nlnlbxk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected...'))
    .catch(error => console.error('MongoDB connection error:', error));

// Endpoint to fetch provinces
app.get('/api/provinces', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://provinces.open-api.vn/api/');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching provinces data' });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
