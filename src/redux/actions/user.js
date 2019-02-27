import axios from 'axios';

import { USER } from './types';

// TODO: make OTP opt-in

/* Fetch User Data */

const getUserStarted = () => ({
	type: USER.UPDATE_STARTED
});

const getUserSuccess = ({
	avatar,
	country,
	email,
	ethAddress,
	id,
	name,
	number
}) => ({
	type: USER.UPDATE_SUCCESS,
	payload: {
		avatar,
		country,
		email,
		ethAddress,
		id,
		name,
		number
	}
});

const getUserFailure = error => ({
	type: USER.UPDATE_ERROR,
	payload: {
		error
	}
});

const getUser = ({ token }) => {
	return dispatch => {
		dispatch(getUserStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/user', {
				token
			})
			.then(response => {
				dispatch(getUserSuccess(response.data));
			})
			.catch(error => {
				dispatch(getUserFailure(error.message));
			});
	};
};

/* Change Name */

const setNameStarted = () => ({
	type: USER.SET_NAME_STARTED
});

const setNameSuccess = ({ name }) => ({
	type: USER.SET_NAME_SUCCESS,
	payload: {
		name
	}
});

const setNameFailure = error => ({
	type: USER.SET_NAME_ERROR,
	payload: {
		error
	}
});

const setName = ({ token, name }) => {
	return dispatch => {
		dispatch(setNameStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/updateUser', {
				name,
				token
			})
			.then(() => {
				dispatch(setNameSuccess({ name }));
			})
			.catch(error => {
				dispatch(setNameFailure(error.message));
			});
	};
};

/* Change Email */

const setEmailStarted = () => ({
	type: USER.SET_EMAIL_STARTED
});

const setEmailSuccess = ({ email }) => ({
	type: USER.SET_EMAIL_SUCCESS,
	payload: {
		email
	}
});

const setEmailFailure = error => ({
	type: USER.SET_EMAIL_ERROR,
	payload: {
		error
	}
});

const setEmail = ({ token, email }) => {
	return dispatch => {
		dispatch(setEmailStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/updateUser', {
				email,
				token
			})
			.then(() => {
				dispatch(setEmailSuccess({ email }));
			})
			.catch(error => {
				dispatch(setEmailFailure(error.message));
			});
	};
};

/* Change Avatar */

const setAvatarStarted = () => ({
	type: USER.SET_AVATAR_STARTED
});

const setAvatarSuccess = ({ avatar }) => ({
	type: USER.SET_AVATAR_SUCCESS,
	payload: {
		avatar
	}
});

const setAvatarFailure = error => ({
	type: USER.SET_AVATAR_ERROR,
	payload: {
		error
	}
});

const setAvatar = ({ token, avatarFile }) => {
	return dispatch => {
		dispatch(setAvatarStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/updateUser', {
				avatarFile,
				token
			})
			.then(response => {
				dispatch(setAvatarSuccess(response.data));
			})
			.catch(error => {
				dispatch(setAvatarFailure(error.message));
			});
	};
};

/* Change Number */

const setNumberStarted = () => ({
	type: USER.SET_NUMBER_STARTED
});

const setNumberSuccess = ({ number }) => ({
	type: USER.SET_NUMBER_SUCCESS,
	payload: {
		number
	}
});

const setNumberFailure = error => ({
	type: USER.SET_NUMBER_ERROR,
	payload: {
		error
	}
});

const setNumber = ({ token, number }) => {
	return dispatch => {
		dispatch(setNumberStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/updateUser', {
				number,
				token
			})
			.then(() => {
				dispatch(setNumberSuccess({ number }));
			})
			.catch(error => {
				dispatch(setNumberFailure(error.message));
			});
	};
};

/* Change Country */

const setCountryStarted = () => ({
	type: USER.SET_COUNTRY_STARTED
});

const setCountrySuccess = ({ country }) => ({
	type: USER.SET_COUNTRY_SUCCESS,
	payload: {
		country
	}
});

const setCountryFailure = error => ({
	type: USER.SET_COUNTRY_ERROR,
	payload: {
		error
	}
});

const setCountry = ({ token, country }) => {
	return dispatch => {
		dispatch(setCountryStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/updateUser', {
				country,
				token
			})
			.then(() => {
				dispatch(setCountrySuccess({ country }));
			})
			.catch(error => {
				dispatch(setCountryFailure(error.message));
			});
	};
};

/* Change Address */

const setEthAddressStarted = () => ({
	type: USER.SET_ADDRESS_STARTED
});

const setEthAddressSuccess = ({ address }) => ({
	type: USER.SET_ADDRESS_SUCCESS,
	payload: {
		address
	}
});

const setEthAddressFailure = error => ({
	type: USER.SET_ADDRESS_ERROR,
	payload: {
		error
	}
});

const setEthAddress = ({ token, address }) => {
	// TODO: Encrypt ethAddress (end-to-end incl. storage)
	return dispatch => {
		dispatch(setEthAddressStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/updateUser', {
				address,
				token
			})
			.then(() => {
				dispatch(setEthAddressSuccess({ address }));
			})
			.catch(error => {
				dispatch(setEthAddressFailure(error.message));
			});
	};
};

/* Clear User Data */

const clearAction = () => ({
	type: USER.CLEAR_ALL
});

const clear = () => {
	return dispatch => {
		dispatch(clearAction());
	};
};

export default {
	clear,
	getUser,
	setAvatar,
	setCountry,
	setEmail,
	setEthAddress,
	setName,
	setNumber
};
