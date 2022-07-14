import { axiosInstance } from '../config';
import { loginFailure, loginStart, loginSuccess } from './AuthActions';

export const login = async (credentials, dispatch) => {
	dispatch(loginStart());

	try {
		const res = await axiosInstance.post(
			'http://localhost:8800/api/auth/login',
			credentials,
		);

		dispatch(loginSuccess(res.data));
	} catch (error) {
		dispatch(loginFailure());
	}
};
