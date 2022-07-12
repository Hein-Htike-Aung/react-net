import { createError } from '../utils/error.js';
import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
	try {
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: CryptoJS.AES.encrypt(
				req.body.password,
				process.env.SECRET_KEY,
			).toString(),
		});
		const user = await newUser.save();
		res.status(200).json(_.omit(user.toJSON(), 'password'));
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) return next(createError(401, 'Wrong username'));

		const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
		const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

		if (originalPassword !== req.body.password)
			return next(createError(401, 'Wrong Credentials'));

		// Generate Tokens
		const accessToken = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.SECRET_KEY,
			{ expiresIn: '5d' },
		);

		res.status(200).json(_.omit({ ...user.toJSON(), accessToken }, 'password'));
	} catch (error) {
		next(error);
	}
};
