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

		console.log(`setting user address: ${address}`);

		return {
			...state,
			ethAccount: {
				...state.ethAccount,
				address,
				isLoading: false
			}
		};
	}
	case USER.CLEAR_ALL: {
		console.log('clearing user data...');

		return initialState;
	}
	default:
		return state;
	}
};

export default userReducer;
