import express from "express";
import cors from 'cors';
import authRouter from './src/auth-back/auth/auth.router.js'
import userRouter from './src/auth-back/users/users.router.js'
import { validateAuth } from "./src/auth-back/auth/auth.middleware.js";
import dotenv from 'dotenv';
dotenv.config();
import scrapeIt from "scrape-it";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// async function scrapeItExample() {
//     const scrapeResult = await scrapeIt('https://slides.com/carboleda', {
//         presentations: {
//             listItem: 'li.deck.public',
//             data: {
//                 title: 'span.deck-title-value',
//                 description: 'span.deck-description-value',
//                 link: {
//                     selector: 'a.deck-link',
//                     attr: 'href'
//                 }
//             }
//         }
//     });
//     console.log(scrapeResult.data);
// }
// scrapeItExample()

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/auth', authRouter);
app.use('/users', validateAuth, userRouter);

app.listen(port, () => console.log(`server listening on port ${port}`));