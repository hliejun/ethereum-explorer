import { USER } from './types';

const setEthAddress = address => ({
	type: USER.SET_ADDRESS,
	payload: {
		address
	}
});

const clearEthAddress = () => ({
	type: USER.CLEAR_ADDRESS
});

const clearUserData = () => ({
	type: USER.CLEAR_ALL
});

export { clearEthAddress, clearUserData, setEthAddress };
