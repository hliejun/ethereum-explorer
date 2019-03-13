import axios from 'axios';

import { NETWORK } from './types';

/* Check Internet Connectivity */

const checkConnectivityStarted = () => ({
	type: NETWORK.CHECK_CONNECTIVITY_STARTED
});

const checkConnectivitySuccess = ({ isValid }) => ({
	type: NETWORK.CHECK_CONNECTIVITY_SUCCESS,
	payload: {
		isValid
	}
});

const checkConnectivityFailure = error => ({
	type: NETWORK.CHECK_CONNECTIVITY_ERROR,
	payload: {
		error
	}
});

const checkConnectivity = ({ staticToken }) => {
	return dispatch => {
		dispatch(checkConnectivityStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/ping', {
				staticToken
			})
			.then(response => {
				dispatch(checkConnectivitySuccess(response.data));
			})
			.catch(error => {
				dispatch(checkConnectivityFailure(error.message));
			});
	};
};

/* Clear Connectivity Status */

const clearConnectivityStatusAction = () => ({
	type: NETWORK.RESET_CONNECTIVITY_STATUS
});

const clearConnectivityStatus = () => {
	return dispatch => {
		dispatch(clearConnectivityStatusAction());
	};
};

export { checkConnectivity, clearConnectivityStatus };
