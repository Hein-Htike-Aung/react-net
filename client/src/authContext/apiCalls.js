import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './AuthActions';

export const login = async (credentials, dispatch) => {
	dispatch(loginStart());

	try {
		const res = await axios.post(
			'http://localhost:8800/api/auth/login',
			credentials,
		);

		dispatch(loginSuccess(res.data));
	} catch (error) {
		dispatch(loginFailure());
	}
};
