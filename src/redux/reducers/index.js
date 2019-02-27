import { combineReducers } from 'redux';

import authReducer from './auth';
import ethereumReducer from './ethereum';
import networkReducer from './network';
import settingsReducer from './settings';
import userReducer from './user';

export default combineReducers({
	authReducer,
	ethereumReducer,
	networkReducer,
	settingsReducer,
	userReducer
});
