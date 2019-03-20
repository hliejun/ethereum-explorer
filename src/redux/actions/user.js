import { USER } from './types';

/* Change Address */

const setEthAddress = address => ({
	type: USER.SET_ADDRESS,
	payload: {
		address
	}
});

/* Clear User Data */

const clearUserData = () => ({
	type: USER.CLEAR_ALL
});

export { clearUserData, setEthAddress };
