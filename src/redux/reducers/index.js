import { combineReducers } from 'redux';

import authReducer from './auth';
import settingsReducer from './settings';
import ethereumReducer from './ethereum';
import userReducer from './user';

export default combineReducers({
	authReducer,
	settingsReducer,
	ethereumReducer,
	userReducer
});
