import express from "express";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, () => console.log(`server listening on port ${port}`));