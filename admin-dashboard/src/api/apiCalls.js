import axios from 'axios';
import {
	loginFailure,
	loginStart,
	loginSuccess,
} from '../context/authContext/AuthActions';
import {
	createMovieFailure,
	createMovieStart,
	createMovieSuccess,
	deleteMovieFailure,
	deleteMovieStart,
	deleteMovieSuccess,
	getMoviesFailure,
	getMoviesStart,
	getMoviesSuccess,
} from '../context/movieContext/MovieActions';

export const login = async (credentials, dispatch) => {
	dispatch(loginStart());

	try {
		const res = await axios.post(
			'http://localhost:8800/api/auth/login',
			credentials,
		);

		res.data.isAdmin && dispatch(loginSuccess(res.data));
	} catch (error) {
		dispatch(loginFailure());
	}
};

export const getMovies = async (dispatch) => {
	dispatch(getMoviesStart());

	try {
		const res = await axios.get('/movies', {
			headers: {
				authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			},
		});

		dispatch(getMoviesSuccess(res.data));
	} catch (error) {
		dispatch(getMoviesFailure());
	}
};

export const deleteMovie = async (id, dispatch) => {
	dispatch(deleteMovieStart());

	try {
		await axios.delete(`/movies/${id}`, {
			headers: {
				authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			},
		});

		dispatch(deleteMovieSuccess(id));
	} catch (error) {
		dispatch(deleteMovieFailure());
	}
};

export const createMovie = async (movie, dispatch) => {
	dispatch(createMovieStart());

	try {
		const res = await axios.post(`/movies`, movie, {
			headers: {
				authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			},
		});

		dispatch(createMovieSuccess(res.data));
	} catch (error) {
		dispatch(createMovieFailure);
	}
};
