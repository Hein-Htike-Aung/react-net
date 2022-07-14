import List from '../models/List.js';
import _ from 'lodash';
import { createError } from '../utils/error.js';

export const createList = async (req, res, next) => {
	if (!req.user.isAdmin)
		return next(createError(403, 'You are not allowed to do that'));

	const newList = new List(req.body);
	try {
		const savedList = await newList.save();

		res.status(201).json(savedList);
	} catch (error) {
		next(error);
	}
};

export const deleteList = async (req, res, next) => {
	if (!req.user.isAdmin)
		return next(createError(403, 'You are not allowed to do that'));

	try {
		await List.findByIdAndDelete(req.params.id);

		res.status(201).send({ message: 'List has been deleted' });
	} catch (error) {
		next(error);
	}
};

export const getAllList = async (req, res, next) => {
	const typeQuery = req.query.type;
	const genreQuery = req.query.genre;
	let list = [];

	try {
		if (typeQuery) {
			if (genreQuery) {
				// Search by type and genre
				list = await List.aggregate([
					{
						$match: { type: typeQuery, genre: genreQuery },
					},
					{
						$sample: { size: 10 },
					},
				]);
			} else {
				// Search By type
				list = await List.aggregate([
					{
						$match: { type: typeQuery },
					},
					{
						$sample: { size: 10 },
					},
				]);
			}
		} else {
			// Search all
			list = await List.aggregate([
				{
					$sample: { size: 10 },
				},
			]);
		}

		res.status(201).json(list);
	} catch (error) {
		next(error);
	}
};
