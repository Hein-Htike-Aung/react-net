import { axiosInstance } from '../../../../api/client/src/config';
import {
	createListFailure,
	createListStart,
	createListSuccess,
	deleteListFailure,
	deleteListStart,
	deleteListSuccess,
	getListsFailure,
	getListsStart,
	getListsSuccess
} from './ListActions';

export const getLists = async (dispatch) => {
	dispatch(getListsStart());
	try {
		const res = await axiosInstance.get('http://localhost:8800/api/list', {
			headers: {
				authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			},
		});
		dispatch(getListsSuccess(res.data));
	} catch (err) {
		dispatch(getListsFailure());
	}
};

//create
export const createList = async (list, dispatch) => {
	dispatch(createListStart());
	try {
		const res = await axiosInstance.post('http://localhost:8800/api/list', list, {
			headers: {
				authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			},
		});
		dispatch(createListSuccess(res.data));
	} catch (err) {
		dispatch(createListFailure());
	}
};

//delete
export const deleteList = async (id, dispatch) => {
	dispatch(deleteListStart());
	try {
		await axiosInstance.delete('http://localhost:8800/api/list/' + id, {
			headers: {
				authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			},
		});
		dispatch(deleteListSuccess(id));
	} catch (err) {
		dispatch(deleteListFailure());
	}
};
