import { SETTINGS } from '../actions/types';

import { stubbedSummary } from '../../components/scenes/Portfolio/_stubbedValues';

const initialState = {
	// currency: 'SGD', // USD, JPY, SGD, KRW, GBP, CNY
	currency: stubbedSummary.code,
	nightMode: false
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
	case SETTINGS.SET_CURRENCY: {
		const { currency } = action.payload;
		return {
			...state,
			currency
		};
	}
	case SETTINGS.TOGGLE_NIGHT_MODE: {
		return {
			...state,
			nightMode: !state.nightMode
		};
	}
	case SETTINGS.RESET: {
		return initialState;
	}
	default:
		return state;
	}
};

export default settingsReducer;