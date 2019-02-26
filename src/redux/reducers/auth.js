import {
	AUTH_SESSION_LOGIN_STARTED,
	AUTH_SESSION_LOGIN_SUCCESS,
	AUTH_SESSION_LOGIN_ERROR,
	AUTH_SESSION_LOGOUT_STARTED,
	AUTH_SESSION_LOGOUT_SUCCESS,
	AUTH_SESSION_LOGOUT_ERROR,
	AUTH_SESSION_EXTEND_STARTED,
	AUTH_SESSION_EXTEND_SUCCESS,
	AUTH_SESSION_EXTEND_ERROR
} from '../actionTypes';

const initialState = {
	isAuthenticated: false,
	isLoading: false,
	sessionAuth: null,
	sessionError: null,
	sessionExpiry: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
	case AUTH_SESSION_LOGIN_STARTED: {
		return {
			...state,
			isLoading: true
		};
	}
	case AUTH_SESSION_LOGIN_SUCCESS: {
		const { sessionAuth, sessionExpiry } = action.payload;
		const isExpired =
        sessionExpiry == null || new Date() > new Date(sessionExpiry);
		const isValidSession = sessionAuth != null && !isExpired;
		return {
			...state,
			isAuthenticated: isValidSession,
			isLoading: false,
			sessionAuth,
			sessionExpiry
		};
	}
	case AUTH_SESSION_LOGIN_ERROR: {
		const { error } = action.payload;
		return {
			...initialState,
			isLoading: false,
			sessionError: error
		};
	}
	case AUTH_SESSION_LOGOUT_STARTED: {
		return {
			...state,
			isLoading: true
		};
	}
	case AUTH_SESSION_LOGOUT_SUCCESS: {
		return initialState;
	}
	case AUTH_SESSION_LOGOUT_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			isLoading: false,
			sessionError: error
		};
	}
	case AUTH_SESSION_EXTEND_STARTED: {
		return {
			...state,
			isLoading: true
		};
	}
	case AUTH_SESSION_EXTEND_SUCCESS: {
		const { sessionAuth, sessionExpiry } = action.payload;
		return {
			...state,
			isLoading: false,
			sessionAuth,
			sessionExpiry
		};
	}
	case AUTH_SESSION_EXTEND_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			isLoading: false,
			sessionError: error
		};
	}
	default:
		return state;
	}
};

export default authReducer;
