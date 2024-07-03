import express from 'express';
import productsRouter from './src/routes/products.routes';
import categoryRouter from './src/routes/categories.routes';
<<<<<<< HEAD
import informationRouter from './src/routes/user.routes';
import loginRouter from './src/routes/login.router'
import { config } from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
=======
import { config } from 'dotenv'
import mongoose from 'mongoose'
// @ts-ignore
import bodyParser from 'body-parser'
// @ts-ignore
import cors from "cors"
// @ts-ignore
import morgan from 'morgan'
import contactsRouter from "./src/routes/contacts.routes";
>>>>>>> 1ebd7a0865a7594a8a25ef3f19d1ccc045abf526

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.use('/api/products', productsRouter);
app.use('/api/categories', categoryRouter);
<<<<<<< HEAD
app.use('/api/users', informationRouter);
app.use('/api/login', loginRouter)

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.nlnlbxk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
=======
app.use('/api/contacts', contactsRouter)
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.nlnlbxk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
>>>>>>> 1ebd7a0865a7594a8a25ef3f19d1ccc045abf526

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected...'))
    .catch(error => console.error('MongoDB connection error:', error));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
