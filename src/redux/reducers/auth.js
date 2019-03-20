import { AUTH } from '../actions/types';

const initialState = {
	error: null,
	isLoading: false,
	lastUpdated: null,
	sessionAuth: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
	case AUTH.SESSION_TOKEN_STARTED: {
		console.log('fetching auth token...');

		return {
			...state,
			isLoading: true
		};
	}
	case AUTH.SESSION_TOKEN_SUCCESS: {
		const { authToken, timestamp } = action.payload;

		console.log(`setting auth token: ${authToken}`);
		console.log(`setting auth timestamp: ${timestamp}`);

		return {
			...state,
			isLoading: false,
			lastUpdated: timestamp,
			sessionAuth: authToken
		};
	}
	case AUTH.SESSION_TOKEN_ERROR: {
		const { error } = action.payload;

		// TODO: Parse error
		console.log(`error fetching auth token: ${error}`);

		return {
			...state,
			error,
			isLoading: false
		};
	}
	case AUTH.SESSION_TOKEN_CLEAR: {
		console.log('clearing auth state...');

		return {
			...initialState
		};
	}
	default:
		return state;
	}
};

export default authReducer;
