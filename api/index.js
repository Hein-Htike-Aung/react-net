import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';
import userRoute from './routes/user.routes.js';
import movieRoute from './routes/movie.routes.js';
import listRoute from './routes/list.routes.js';
import authRoute from './routes/auth.routes.js';

const app = express();
dotenv.config();

/* MongoDB Connection */
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
	} catch (error) {
		throw error;
	}
};

mongoose.connection.on('disconnected', () => {
	console.log('mongoDB disconnected!');
});

/* Middlewares */
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/users', movieRoute);
app.use('/api/users', listRoute);

app.use(errorHandler);

app.listen(8800, () => {
	connect();
	console.log('Backend server is running!!!');
});
