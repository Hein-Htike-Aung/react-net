import express from 'express';
import {
	createMovie,
	deleteMovie,
	getAllMovies,
	getMovie,
	getRandomMovies,
	updateMovie,
} from '../controllers/movie.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/', [verifyToken], createMovie);
router.patch('/:id', [verifyToken], updateMovie);
router.delete('/:id', [verifyToken], deleteMovie);
router.get('/find/:id', [verifyToken], getMovie);
router.get('/', [verifyToken], getAllMovies);
router.get('/random', [verifyToken], getRandomMovies);

export default router;
