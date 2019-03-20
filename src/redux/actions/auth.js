import axios from 'axios';

import { AUTH } from './types';

/* Get Auth Token */

const getAuthTokenStarted = () => ({
	type: AUTH.SESSION_TOKEN_STARTED
});

const getAuthTokenSuccess = ({ authToken, timestamp }) => ({
	type: AUTH.SESSION_TOKEN_SUCCESS,
	payload: {
		authToken,
		timestamp
	}
});

const getAuthTokenFailure = error => ({
	type: AUTH.SESSION_TOKEN_ERROR,
	payload: {
		error
	}
});

const getAuthToken = token => {
	return dispatch => {
		dispatch(getAuthTokenStarted());
		axios
			.post(
				`${process.env.API_URL}/auth`,
				{ token },
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.then(response => {
				dispatch(getAuthTokenSuccess(response.data));
			})
			.catch(error => {
				dispatch(getAuthTokenFailure(error.message));
			});
	};
};

/* Clear Auth Token */

const clearAuthToken = () => ({
	type: AUTH.SESSION_TOKEN_CLEAR
});

export { clearAuthToken, getAuthToken };
