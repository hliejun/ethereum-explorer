import axios from 'axios';

import { AUTH } from './types';

/* Login */

const loginStarted = () => ({
	type: AUTH.SESSION_LOGIN_STARTED
});

const loginSuccess = ({ sessionAuth, sessionExpiry }) => ({
	type: AUTH.SESSION_LOGIN_SUCCESS,
	payload: {
		sessionAuth,
		sessionExpiry
	}
});

const loginFailure = error => ({
	type: AUTH.SESSION_LOGIN_ERROR,
	payload: {
		error
	}
});

const login = ({ username, password }) => {
	return dispatch => {
		dispatch(loginStarted());
		// TODO: Encrypt username and password into serialised token
		axios
			.post('https://jsonplaceholder.typicode.com/login', {
				password,
				username
			})
			.then(response => {
				dispatch(loginSuccess(response.data));
			})
			.catch(error => {
				dispatch(loginFailure(error.message));
			});
	};
};

/* Extend */

const extendStarted = () => ({
	type: AUTH.SESSION_EXTEND_STARTED
});

const extendSuccess = ({ sessionAuth, sessionExpiry }) => ({
	type: AUTH.SESSION_EXTEND_SUCCESS,
	payload: {
		sessionAuth,
		sessionExpiry
	}
});

const extendFailure = error => ({
	type: AUTH.SESSION_EXTEND_ERROR,
	payload: {
		error
	}
});

const extend = ({ token }) => {
	return dispatch => {
		dispatch(extendStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/extend', {
				token
			})
			.then(response => {
				dispatch(extendSuccess(response.data));
			})
			.catch(error => {
				dispatch(extendFailure(error.message));
			});
	};
};

/* Logout */

const logoutStarted = () => ({
	type: AUTH.SESSION_LOGOUT_STARTED
});

const logoutSuccess = () => ({
	type: AUTH.SESSION_LOGOUT_SUCCESS
});

const logoutFailure = error => ({
	type: AUTH.SESSION_LOGOUT_ERROR,
	payload: {
		error
	}
});

const logout = ({ token }) => {
	return dispatch => {
		dispatch(logoutStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/logout', {
				token
			})
			.then(() => {
				dispatch(logoutSuccess());
			})
			.catch(error => {
				dispatch(logoutFailure(error.message));
			});
	};
};

/* Check Username */

const checkUsernameStarted = () => ({
	type: AUTH.CHECK_USERNAME_AVAIL_STARTED
});

const checkUsernameSuccess = ({ isValid }) => ({
	type: AUTH.CHECK_USERNAME_AVAIL_SUCCESS,
	payload: {
		isValid
	}
});

const checkUsernameFailure = error => ({
	type: AUTH.CHECK_USERNAME_AVAIL_ERROR,
	payload: {
		error
	}
});

const checkUsername = ({ staticToken, username }) => {
	return dispatch => {
		dispatch(checkUsernameStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/username', {
				staticToken,
				username
			})
			.then(response => {
				dispatch(checkUsernameSuccess(response.data));
			})
			.catch(error => {
				dispatch(checkUsernameFailure(error.message));
			});
	};
};

/* Clear Username Status */

const clearUsernameStatusAction = () => ({
	type: AUTH.RESET_USERNAME_STATUS
});

const clearUsernameStatus = () => {
	return dispatch => {
		dispatch(clearUsernameStatusAction());
	};
};

// TODO: signup actions

/*
const signup = ({ username, password, country, email, number }) => {
	return dispatch => {
		// signup async logic + pipe to login
	};
};
*/

// TODO: change password actions

/*
const changePassword = ({ token, oldPassword, newPassword }) => {
	return dispatch => {
		// change password async logic
	};
};
*/

// TODO: deactivate actions

/*
const deactivateAccount = ({ token }) => {
	return dispatch => {
		// deactivate async logic
	};
};
*/

export { checkUsername, clearUsernameStatus, extend, login, logout };
