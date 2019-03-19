import { SETTINGS } from './types';

/* Currency */

const setCurrency = currency => ({
	type: SETTINGS.SET_CURRENCY,
	payload: { currency }
});

/* Night Mode */

const toggleNightMode = () => ({
	type: SETTINGS.TOGGLE_NIGHT_MODE
});

/* Reset Settings */

const resetSettings = () => ({
	type: SETTINGS.RESET
});

export { resetSettings, setCurrency, toggleNightMode };
