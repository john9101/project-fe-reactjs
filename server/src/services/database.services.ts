import { config } from "dotenv"
import { Collection, Db, MongoClient } from "mongodb"

config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@bandongphuc.nlnlbxk.mongodb.net/?retryWrites=true&w=majority&appName=bandongphuc`

class DatabaseService{
    private client: MongoClient
    private db: Db

    constructor(){
        this.client = new MongoClient(uri)
        this.db = this.client.db(process.env.DB_NAME)
    }

    get products(): Collection<any>{
        return this.db.collection('products')
    }

    async connect(){
        try{
            const db = this.db
            await db.command({ping: 1})
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } catch(error){
          console.log('Error', error)
          throw error
        }
    }
}

const databaseService = new DatabaseService()
export default databaseService;