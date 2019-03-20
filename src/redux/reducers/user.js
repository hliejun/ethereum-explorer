import { USER } from '../actions/types';

const initialState = {
	ethAccount: {
		address: '',
		error: null,
		isLoading: false
	}
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
	case USER.SET_ADDRESS: {
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
	case USER.CLEAR_ADDRESS: {
		return {
			...state,
			ethAccount: {
				...initialState.ethAccount
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
