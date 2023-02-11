import express from 'express';
import cors from 'cors';
import game from './routes/gameRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use([game])

app.listen(process.env.PORT || 5000);