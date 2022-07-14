import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import _ from 'lodash';
import { createError } from '../utils/error.js';

export const updateUser = async (req, res, next) => {
	const id = req.params.id;

	if (req.user.id !== id && !req.user.isAdmin) {
		return next(createError(403, 'You are not allowed to do that'));
	}

	if (req.body.password) {
		req.body.password = CryptoJS.AES.encrypt(
			req.body.password,
			process.env.SECRET_KEY,
		).toString();
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true },
		);

		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	const id = req.params.id;

	if (req.user.id !== id && !req.user.isAdmin) {
		return next(createError(403, 'You are not allowed to do that'));
	}

	try {
		await User.findByIdAndDelete(id);

		res.status(200).send({ message: 'User has been deleted' });
	} catch (error) {
		next(error);
	}
};

export const getUser = async (req, res, next) => {
	const id = req.params.id;

	try {
		const user = await User.findById(id);

		res.status(200).json(_.omit(user.toJSON(), 'password'));
	} catch (error) {
		next(error);
	}
};

export const getAllUser = async (req, res, next) => {
	const query = req.query.new;

	if (!req.user.isAdmin)
		return next(createError('403', 'Your are not allowed to do that'));

	try {
		const users = query
			? await User.find().sort({ _id: -1 }).limit(5)
			: await User.find();

		res.status(200).json(
			_.map(users, function (user) {
				return _.omit(user.toJSON(), 'password', 'isAdmin');
			}),
		);
	} catch (error) {
		next(error);
	}
};

export const getUsersStat = async (req, res, next) => {
	const today = new Date();
	const lastYear = today.setFullYear(today.setFullYear() - 1);

	try {

		const yearlydata = await User.aggregate([
			{
				$project: {
					year: { $year: '$createdAt' },
				},
			},
			{
				$group: {
					_id: '$year',
					total: { $sum: 1 },
				},
			},
		]);

		const monthlydata = await User.aggregate([
			{
				$project: {
					month: { $month: '$createdAt' },
				},
			},
			{
				$group: {
					_id: '$month',
					total: { $sum: 1 },
				},
			},
		]);

		res.status(200).json(monthlydata);
	} catch (error) {
		next(error);
	}
};
