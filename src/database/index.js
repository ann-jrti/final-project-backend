import { MongoClient, Logger } from "mongodb";
const { DB_PW } = process.env;
const DATABASE_NAME = 'ann-final-project';
const URI = `mongodb+srv://andrea:${DB_PW}@cluster0.s9dbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export let db = () => {
    log.error('Database connection not available yet')
}

export const connectDB = async () => {
    try {
        log.info(`Connecting to mongodbs ${URI}`)
        const client = new MongoClient(URI);
        const conenctionTime = log.startTimer();
        await client.connect();
        conenctionTime.done({ message: 'Connected to mongo' });
        db = client.db(DATABASE_NAME);
        log.info(`Conected to db ${DATABASE_NAME}`)
    } catch (e) {
        log.error(e)
    }

}

console.log(DB_PW)