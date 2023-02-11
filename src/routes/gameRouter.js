import {Router} from 'express';
import { getGame, postGame } from '../controller/game.js';

const game = Router();

game.get('/games', getGame);
game.post('/games', postGame)

export default game;