import {Router} from 'express';
import { deleteRentalsId, getRentals, postRentals, postRentalsIdFinish } from '../controller/rentals.js';

const rentals = Router();

rentals.get('/rentals', getRentals);
rentals.post('/rentals', postRentals);
rentals.post('/rentals/:id/return', postRentalsIdFinish);
rentals.delete('/rentals/:id', deleteRentalsId);

export default rentals;