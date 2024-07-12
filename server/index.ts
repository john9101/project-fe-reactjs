// @ts-ignore
import express from 'express'
import productsRouter from './src/routes/products.routes'
import categoryRouter from './src/routes/categories.routes';
import { config } from 'dotenv'
import mongoose from 'mongoose'
// @ts-ignore
import bodyParser from 'body-parser'
// @ts-ignore
import cors from "cors"
// @ts-ignore
import morgan from 'morgan'
import contactsRouter from "./src/routes/contacts.routes";
import requiresRouter from "./src/routes/requires.routes";
import voucherRouter from "./src/routes/vouchers.routes";

config()
const app = express()
const port = process.env.PORT

app.use(bodyParser.json({limit: "50mb"}))
app.use(cors())
app.use(morgan("common"))

app.use('/api/products', productsRouter)
app.use('/api/categories', categoryRouter);
app.use('/api/contacts', contactsRouter)
app.use('/api/requires', requiresRouter)
app.use('/api/vouchers', voucherRouter)

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.nlnlbxk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected...'))
    .catch(error => console.error('MongoDB connection error:', error))

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})