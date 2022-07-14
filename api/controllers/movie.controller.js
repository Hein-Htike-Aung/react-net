import Movie from '../models/Movie.js';
import _ from 'lodash';
import { createError } from '../utils/error.js';

export const createMovie = async (req, res, next) => {
	if (!req.user.isAdmin)
		return next(createError(403, 'You are not allowed to do that'));

	const newMovie = new Movie(req.body);
	try {
		const savedMovie = await newMovie.save();

		res.status(201).json(savedMovie);
	} catch (error) {
		next(error);
	}
};

export const updateMovie = async (req, res, next) => {
	const id = req.params.id;

	if (!req.user.isAdmin)
		return next(createError(403, 'You are not allowed to do that'));

	try {
		const updatedMovie = await Movie.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true },
		);

		res.status(200).json(updatedMovie);
	} catch (error) {
		next(error);
	}
};

export const deleteMovie = async (req, res, next) => {
	const id = req.params.id;

	if (!req.user.isAdmin)
		return next(createError(403, 'You are not allowed to do that'));

	try {
		await Movie.findByIdAndDelete(id);

		res.status(200).send({ message: 'Movie has been deleted' });
	} catch (error) {
		next(error);
	}
};

export const getMovie = async (req, res, next) => {
	const id = req.params.id;

	try {
		const movie = await Movie.findById(id);

		res.status(200).json(movie);
	} catch (error) {
		next(error);
	}
};

export const getAllMovies = async (req, res, next) => {
	const query = req.query.new;

	if (!req.user.isAdmin)
		return next(createError('403', 'Your are not allowed to do that'));

	try {
		const movies = query
			? await Movie.find().sort({ _id: -1 }).limit(10)
			: await Movie.find();

		res.status(200).json(movies.reverse());
	} catch (error) {
		next(error);
	}
};

export const getRandomMovies = async (req, res, next) => {
	const type = req.query.type;

	let movies;

	try {
		// Get one random series
		if (type === 'series') {
			movies = await Movie.aggregate([
				{
					$match: { isSeries: true },
				},
				{
					$sample: {
						// Get Random one
						size: 1,
					},
				},
			]);
		} else {
			// Get one random movie
			movies = await Movie.aggregate([
				{
					$match: { isSeries: false },
				},
				{
					$sample: {
						// Get Random one
						size: 1,
					},
				},
			]);
		}

		res.status(200).json(movies);
	} catch (error) {
		next(error);
	}
};
