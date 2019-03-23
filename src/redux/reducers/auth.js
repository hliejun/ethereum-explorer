import { AUTH } from '../actions/types';

export const initialState = {
	error: null,
	isLoading: false,
	lastUpdated: null,
	sessionAuth: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
	case AUTH.SESSION_TOKEN_STARTED: {
		return {
			...state,
			isLoading: true
		};
	}
	case AUTH.SESSION_TOKEN_SUCCESS: {
		const { authToken, timestamp } = action.payload;
		return {
			...state,
			error: null,
			isLoading: false,
			lastUpdated: timestamp,
			sessionAuth: authToken
		};
	}
	case AUTH.SESSION_TOKEN_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			error,
			isLoading: false
		};
	}
	case AUTH.SESSION_TOKEN_CLEAR: {
		return {
			...initialState
		};
	}
	default:
		return state;
	}
};

export default authReducer;
