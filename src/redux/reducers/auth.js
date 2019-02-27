import { AUTH } from '../actions/types';

const initialState = {
	changePassword: {
		error: null,
		isLoading: false
	},
	deactivate: {
		error: null,
		isLoading: false
	},
	extend: {
		error: null,
		isLoading: false
	},
	isAuthenticated: false,
	login: {
		error: null,
		isLoading: false
	},
	logout: {
		error: null,
		isLoading: false
	},
	otp: {
		error: null,
		expiry: null,
		isLoading: false
	},
	registration: {
		error: null,
		isLoading: false,
		username: {
			error: null,
			isLoading: false,
			isValid: null
		}
	},
	sessionAuth: null,
	sessionExpiry: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
	case AUTH.SESSION_LOGIN_STARTED: {
		return {
			...state,
			login: {
				...state.login,
				isLoading: true
			}
		};
	}
	case AUTH.SESSION_LOGIN_SUCCESS: {
		const { sessionAuth, sessionExpiry } = action.payload;
		const isExpired =
        sessionExpiry == null || new Date() > new Date(sessionExpiry);
		const isValidSession = sessionAuth != null && !isExpired;
		return {
			...state,
			isAuthenticated: isValidSession,
			login: {
				...state.login,
				isLoading: false
			},
			sessionAuth,
			sessionExpiry
		};
	}
	case AUTH.SESSION_LOGIN_ERROR: {
		const { error } = action.payload;
		return {
			...initialState,
			login: {
				...state.login,
				error,
				isLoading: false
			}
		};
	}
	case AUTH.SESSION_LOGOUT_STARTED: {
		return {
			...state,
			logout: {
				...state.logout,
				isLoading: true
			}
		};
	}
	case AUTH.SESSION_LOGOUT_SUCCESS: {
		return initialState;
	}
	case AUTH.SESSION_LOGOUT_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			logout: {
				...state.logout,
				error,
				isLoading: false
			}
		};
	}
	case AUTH.SESSION_EXTEND_STARTED: {
		return {
			...state,
			extend: {
				...state.extend,
				isLoading: true
			}
		};
	}
	case AUTH.SESSION_EXTEND_SUCCESS: {
		const { sessionAuth, sessionExpiry } = action.payload;
		return {
			...state,
			extend: {
				...state.extend,
				isLoading: false
			},
			sessionAuth,
			sessionExpiry
		};
	}
	case AUTH.SESSION_EXTEND_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			extend: {
				...state.extend,
				error,
				isLoading: false
			}
		};
	}
	case AUTH.CHECK_USERNAME_AVAIL_STARTED: {
		return {
			...state,
			registration: {
				...state.registration,
				username: {
					...state.registration.username,
					isLoading: true
				}
			}
		};
	}
	case AUTH.CHECK_USERNAME_AVAIL_SUCCESS: {
		const { isValid } = action.payload;
		return {
			...state,
			registration: {
				...state.registration,
				username: {
					...state.registration.username,
					isLoading: false,
					isValid
				}
			}
		};
	}
	case AUTH.CHECK_USERNAME_AVAIL_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			registration: {
				...state.registration,
				username: {
					...state.registration.username,
					error,
					isLoading: false
				}
			}
		};
	}
	case AUTH.RESET_USERNAME_STATUS: {
		return {
			...state,
			registration: {
				...state.registration,
				username: initialState.registration.username
			}
		};
	}
	default:
		return state;
	}
};

export default authReducer;
