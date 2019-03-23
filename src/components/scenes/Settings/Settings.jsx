import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clns from 'classnames';

import {
	getAddress,
	getApiKey,
	getAuthToken,
	getCode,
	getTheme
} from '../../../redux/selectors';

import { getAuthToken as fetchAuthToken } from '../../../redux/actions/auth';

import {
	resetSettings,
	setApiKey,
	setCurrency,
	toggleNightMode
} from '../../../redux/actions/settings';

import { clearEthAddress, setEthAddress } from '../../../redux/actions/user';

import { ControlledForm, Input, Select } from '../../common/Form';
import { Section, SubSection } from '../../common/Sections';

import ResetIcon from '../../../assets/icons/glyphs/reset.svg';

import {
	SETTINGS_INPUT_PLACEHOLDER_ADDRESS,
	SETTINGS_INPUT_PLACEHOLDER_API_KEY,
	SETTINGS_LENGTH_API_KEY,
	APP_SUBSECTIONS_DATA,
	CURRENCY_OPTIONS,
	CURRENCY_SYMBOLS,
	SETTINGS_LENGTH_ETH_ADDRESS,
	SETTINGS_SECTIONS_DATA,
	SETTINGS_TITLE,
	USER_SUBSECTIONS_DATA
} from '../../../constants';

import './_settings.scss';

/**
 * NOTE:
 * API key and Ethereum address inputs can be validated
 * with error messages for clearer communication of
 * input constraints instead of silently failing
 */

const Settings = ({
	address,
	apiKey,
	authToken,
	className,
	clearSettings,
	currency,
	isDarkMode,
	reset,
	setOptions: updateOptions,
	setTitle: updateTitle,
	updateAddress,
	updateApiKey,
	updateAuthToken,
	updateCurrency,
	updateNightMode
}) => {
	// Input change management (syncing with Redux store)
	const updateSettings = (values, fieldName) => {
		switch (fieldName) {
		case 'address':
			if (values.address !== address) {
				updateAddress(values.address);
			}
			break;
		case 'currency':
			if (values.currency !== currency) {
				updateCurrency(values.currency);
			}
			break;
		case 'isDarkMode':
			if (values.isDarkMode !== isDarkMode) {
				updateNightMode();
			}
			break;
		case 'apiKey':
			if (values.apiKey !== apiKey) {
				updateApiKey(values.apiKey);
				if (
					!authToken &&
            values.apiKey &&
            values.apiKey.length === SETTINGS_LENGTH_API_KEY
				) {
					updateAuthToken(values.apiKey);
				}
			}
			break;
		default:
      // do nothing
		}
	};

	const options = [{ handler: clearSettings, icon: ResetIcon, key: 'reset' }];

	// Setup AppBar for this page
	useEffect(() => {
		updateOptions(options);
		updateTitle(SETTINGS_TITLE);
		return () => {
			reset();
		};
	}, [options.length]);

	// Always start from top (do not persist scroll state)
	useEffect(() => {
		if (window) {
			window.scroll(0, 0);
		}
	}, [window]);

	return (
		<div className={clns('page', 'settings', className)}>
			<ControlledForm
				defaultValues={{ address, apiKey, currency, isDarkMode }}
				id="settings-form"
				onChange={updateSettings}
				values={{ address, apiKey, currency, isDarkMode }}
			>
				{() => (
					<React.Fragment>
						<Section
							className="settings__section settings__section--app"
							{...SETTINGS_SECTIONS_DATA.app}
						>
							<SubSection
								className="settings__subsection settings__subsection--key"
								{...APP_SUBSECTIONS_DATA.key}
							>
								<Input
									className="settings__field--key"
									maxLength={SETTINGS_LENGTH_API_KEY}
									name="apiKey"
									placeholder={SETTINGS_INPUT_PLACEHOLDER_API_KEY}
									type="textarea"
									value={apiKey}
								/>
							</SubSection>
							<SubSection
								className="settings__subsection settings__subsection--currency"
								{...APP_SUBSECTIONS_DATA.currency}
							>
								<Select
									className="settings__field--currency"
									name="currency"
									options={CURRENCY_OPTIONS}
								/>
							</SubSection>
							<SubSection
								className="settings__subsection settings__subsection--theme"
								{...APP_SUBSECTIONS_DATA.theme}
							>
								<Input
									className="settings__field--theme"
									name="isDarkMode"
									type="toggle"
									value={isDarkMode}
								/>
							</SubSection>
						</Section>
						<Section
							className="settings__section settings__section--user"
							{...SETTINGS_SECTIONS_DATA.user}
						>
							<SubSection
								className="settings__subsection settings__subsection--address"
								{...USER_SUBSECTIONS_DATA.address}
							>
								<Input
									className="settings__field--address"
									maxLength={SETTINGS_LENGTH_ETH_ADDRESS}
									name="address"
									placeholder={SETTINGS_INPUT_PLACEHOLDER_ADDRESS}
									type="textarea"
									value={address}
								/>
							</SubSection>
						</Section>
					</React.Fragment>
				)}
			</ControlledForm>
		</div>
	);
};

Settings.propTypes = {
	address: PropTypes.string,
	apiKey: PropTypes.string,
	authToken: PropTypes.string,
	className: PropTypes.string,
	clearSettings: PropTypes.func.isRequired,
	currency: PropTypes.oneOf(Object.keys(CURRENCY_SYMBOLS)).isRequired,
	isDarkMode: PropTypes.bool.isRequired,
	reset: PropTypes.func.isRequired,
	setOptions: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	updateAddress: PropTypes.func.isRequired,
	updateApiKey: PropTypes.func.isRequired,
	updateAuthToken: PropTypes.func.isRequired,
	updateCurrency: PropTypes.func.isRequired,
	updateNightMode: PropTypes.func.isRequired
};

Settings.defaultProps = {
	address: '',
	apiKey: '',
	authToken: null,
	className: null
};

const mapStateToProps = state => ({
	address: getAddress(state),
	apiKey: getApiKey(state),
	authToken: getAuthToken(state),
	currency: getCode(state),
	isDarkMode: getTheme(state)
});

const mapDispatchToProps = dispatch => ({
	clearSettings: () => {
		dispatch(resetSettings());
		dispatch(clearEthAddress());
	},
	updateAddress: address => dispatch(setEthAddress(address)),
	updateApiKey: apiKey => dispatch(setApiKey(apiKey)),
	updateAuthToken: token => dispatch(fetchAuthToken(token)),
	updateCurrency: currency => dispatch(setCurrency(currency)),
	updateNightMode: () => dispatch(toggleNightMode())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
