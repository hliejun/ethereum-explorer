const KEY_LOCAL_STATE = 'localState';
const KEY_SESSION_STATE = 'sessionState';

const loadStateFromSession = () => {
	try {
		const serialisedState = sessionStorage.getItem(KEY_SESSION_STATE);
		return JSON.parse(serialisedState);
	} catch (error) {
		return undefined;
	}
};

const saveStateToSession = state => {
	try {
		const serialisedState = JSON.stringify(state);
		sessionStorage.setItem(KEY_SESSION_STATE, serialisedState);
	} catch (error) {
		// Ignore errors...
	}
};

const loadStateFromLocal = () => {
	try {
		const serialisedState = localStorage.getItem(KEY_LOCAL_STATE);
		return JSON.parse(serialisedState);
	} catch (error) {
		return undefined;
	}
};

const saveStateToLocal = state => {
	try {
		const serialisedState = JSON.stringify(state);
		localStorage.setItem(KEY_LOCAL_STATE, serialisedState);
	} catch (error) {
		// Ignore errors...
	}
};

export default {
	local: {
		loadState: loadStateFromLocal,
		saveState: saveStateToLocal
	},
	session: {
		loadState: loadStateFromSession,
		saveState: saveStateToSession
	}
};
