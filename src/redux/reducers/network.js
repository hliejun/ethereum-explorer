import { NETWORK } from '../actions/types';

const initialState = {
	connectivity: {
		error: null,
		isConnected: null,
		isLoading: false
	}
};

const networkReducer = (state = initialState, action) => {
	switch (action.type) {
	case NETWORK.CHECK_CONNECTIVITY_STARTED: {
		return {
			...state,
			connectivity: {
				...state.connectivity,
				isLoading: true
			}
		};
	}
	case NETWORK.CHECK_CONNECTIVITY_SUCCESS: {
		const { isConnected } = action.payload;
		return {
			...state,
			connectivity: {
				...state.connectivity,
				isConnected,
				isLoading: false
			}
		};
	}
	case NETWORK.CHECK_CONNECTIVITY_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			connectivity: {
				...state.connectivity,
				error,
				isLoading: false
			}
		};
	}
	case NETWORK.RESET_CONNECTIVITY_STATUS: {
		return initialState;
	}
	default:
		return state;
	}
};

export default networkReducer;
