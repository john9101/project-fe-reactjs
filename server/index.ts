// @ts-ignore
import express from 'express'
import productsRouter from './src/routes/products.routes'
import categoryRouter from './src/routes/categories.routes';
import { config } from 'dotenv'
import mongoose, {Schema} from 'mongoose'
// @ts-ignore
import bodyParser from 'body-parser'
// @ts-ignore
import cors from "cors"
// @ts-ignore
import morgan from 'morgan'
import requiresRouter from "./src/routes/requires.routes";
import contactsRouter from "./src/routes/contacts.routes";
import { createServer } from "http";
import { Server } from "socket.io";

config()
const app = express()
const httpServer = createServer(app);

const port = process.env.PORT

app.use(bodyParser.json({limit: "50mb"}))
app.use(cors())
app.use(morgan("common"))

app.use('/api/products', productsRouter)
app.use('/api/categories', categoryRouter);
app.use('/api/contacts', contactsRouter)
app.use('/api/requires', requiresRouter)

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.nlnlbxk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected...'))
    .catch(error => console.error('MongoDB connection error:', error))

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

const users: {
    [key: string]: {
        socket_id: string
    }
} = {}

io.on('connection', (socket) => {
    console.log(`${socket.id} connected!`)

    const user_id = socket.handshake.auth.user_id
    users[user_id] = {
        socket_id: socket.id
    }
    console.log(users)

    socket.on("private-message", (data) => {
        console.log(data)
        const receiver_socket_id = users[data.to].socket_id
        socket.to(receiver_socket_id).emit("receive_private-message", {
            content: data.content,
            from: user_id
        })
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected!`)
        delete users[user_id]
    })
})

httpServer.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})