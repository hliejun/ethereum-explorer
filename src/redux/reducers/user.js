import { USER } from '../actions/types';

const initialState = {
	avatar: {
		error: null,
		isLoading: false,
		url: null
	},
	country: {
		// code: null,
		code: 'SGD',
		error: null,
		isLoading: false
	},
	email: {
		address: null,
		error: null,
		isLoading: false
	},
	error: null,
	ethAccount: {
		// address: null,
		address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
		error: null,
		isLoading: false
	},
	id: null,
	isLoading: false,
	mobile: {
		error: null,
		isLoading: false,
		number: null
	},
	name: {
		error: null,
		isLoading: false,
		preferred: null
	}
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
	case USER.UPDATE_STARTED: {
		return {
			...state,
			isLoading: true
		};
	}
	case USER.UPDATE_SUCCESS: {
		const {
			avatar,
			country,
			email,
			ethAddress,
			id,
			name,
			number
		} = action.payload;
		return {
			...state,
			id,
			isLoading: false,
			avatar: {
				...state.avatar,
				url: avatar
			},
			country: {
				...state.country,
				code: country
			},
			email: {
				...state.email,
				address: email
			},
			ethAccount: {
				...state.ethAccount,
				address: ethAddress
			},
			name: {
				...state.name,
				preferred: name
			},
			mobile: {
				...state.mobile,
				number
			}
		};
	}
	case USER.UPDATE_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			error,
			isLoading: false
		};
	}
	case USER.SET_NAME_STARTED: {
		return {
			...state,
			name: {
				...state.name,
				isLoading: true
			}
		};
	}
	case USER.SET_NAME_SUCCESS: {
		const { name } = action.payload;
		return {
			...state,
			name: {
				...state.name,
				preferred: name,
				isLoading: false
			}
		};
	}
	case USER.SET_NAME_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			name: {
				...state.name,
				error,
				isLoading: false
			}
		};
	}
	case USER.SET_AVATAR_STARTED: {
		return {
			...state,
			avatar: {
				...state.avatar,
				isLoading: true
			}
		};
	}
	case USER.SET_AVATAR_SUCCESS: {
		const { avatar } = action.payload;
		return {
			...state,
			avatar: {
				...state.avatar,
				url: avatar,
				isLoading: false
			}
		};
	}
	case USER.SET_AVATAR_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			avatar: {
				...state.avatar,
				error,
				isLoading: false
			}
		};
	}

	case USER.SET_EMAIL_STARTED: {
		return {
			...state,
			email: {
				...state.email,
				isLoading: true
			}
		};
	}
	case USER.SET_EMAIL_SUCCESS: {
		const { email } = action.payload;
		return {
			...state,
			email: {
				...state.email,
				address: email,
				isLoading: false
			}
		};
	}
	case USER.SET_EMAIL_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			email: {
				...state.email,
				error,
				isLoading: false
			}
		};
	}
	case USER.SET_NUMBER_STARTED: {
		return {
			...state,
			mobile: {
				...state.mobile,
				isLoading: true
			}
		};
	}
	case USER.SET_NUMBER_SUCCESS: {
		const { number } = action.payload;
		return {
			...state,
			mobile: {
				...state.mobile,
				number,
				isLoading: false
			}
		};
	}
	case USER.SET_NUMBER_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			mobile: {
				...state.mobile,
				error,
				isLoading: false
			}
		};
	}
	case USER.SET_COUNTRY_STARTED: {
		return {
			...state,
			country: {
				...state.country,
				isLoading: true
			}
		};
	}
	case USER.SET_COUNTRY_SUCCESS: {
		const { country } = action.payload;
		return {
			...state,
			country: {
				...state.country,
				code: country,
				isLoading: false
			}
		};
	}
	case USER.SET_COUNTRY_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			country: {
				...state.country,
				error,
				isLoading: false
			}
		};
	}
	case USER.SET_ADDRESS_STARTED: {
		return {
			...state,
			ethAccount: {
				...state.ethAccount,
				isLoading: true
			}
		};
	}
	case USER.SET_ADDRESS_SUCCESS: {
		const { address } = action.payload;
		return {
			...state,
			ethAccount: {
				...state.ethAccount,
				address,
				isLoading: false
			}
		};
	}
	case USER.SET_ADDRESS_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			ethAccount: {
				...state.ethAccount,
				error,
				isLoading: false
			}
		};
	}
	case USER.CLEAR_ALL: {
		return initialState;
	}
	default:
		return state;
	}
};

export default userReducer;
