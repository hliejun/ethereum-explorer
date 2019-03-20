import { combineReducers } from 'redux';

import authReducer from './auth';
import ethereumReducer from './ethereum';
import settingsReducer from './settings';
import userReducer from './user';

export default combineReducers({
	authReducer,
	ethereumReducer,
	settingsReducer,
	userReducer
});
