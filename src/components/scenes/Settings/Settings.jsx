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

import { CURRENCY_SYMBOLS } from '../../common/Currency';

import { ControlledForm, Input, Select } from '../../common/Form';
import { Section, SubSection } from '../../common/Sections';

import AppIcon from '../../../assets/icons/glyphs/application.svg';
import ResetIcon from '../../../assets/icons/glyphs/reset.svg';
import UserIcon from '../../../assets/icons/glyphs/avatar.svg';

import './_settings.scss';

const SETTINGS_TITLE = 'Transaction Details';

const API_KEY_LENGTH = 64;
const ETH_ADDRESS_LENGTH = 42;

const ADDRESS_INPUT_PLACEHOLDER = 'Enter your Ethereum address...';
const API_KEY_INPUT_PLACEHOLDER = 'Enter your API key...';
const CURRENCY_INPUT_OPTIONS = [
	{ label: 'British Pound', value: 'GBP' },
	{ label: 'Chinese Yuan', value: 'CNY' },
	{ label: 'Japanese Yen', value: 'JPY' },
	{ label: 'Korean Won', value: 'KRW' },
	{ label: 'Singapore Dollars', value: 'SGD' },
	{ label: 'U.S Dollars', value: 'USD' }
];

const SETTINGS_SECTIONS_DATA = {
	app: {
		description: 'Credentials, view behaviours and customisations, etc.',
		footer: '* Conversion rates are hidden when unavailable',
		icon: AppIcon,
		title: 'Application Settings'
	},
	user: {
		description: 'User account and profile options, etc.',
		icon: UserIcon,
		title: 'User Settings'
	}
};

const APP_SUBSECTIONS_DATA = {
	currency: {
		description: 'Conversion rate for localising Ethereum',
		title: 'Preferred Currency *'
	},
	key: {
		description: 'Usage key for controlled API endpoint access',
		title: 'API Key'
	},
	theme: {
		description: 'Dark style for low-light environment',
		title: 'Use Dark Mode'
	}
};

const USER_SUBSECTIONS_DATA = {
	address: {
		description: 'Designated cryptocurrency account hash',
		title: 'Ethereum Address'
	}
};

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
            values.apiKey.length === API_KEY_LENGTH
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
									maxLength={API_KEY_LENGTH}
									name="apiKey"
									placeholder={API_KEY_INPUT_PLACEHOLDER}
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
									options={CURRENCY_INPUT_OPTIONS}
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
									maxLength={ETH_ADDRESS_LENGTH}
									name="address"
									placeholder={ADDRESS_INPUT_PLACEHOLDER}
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
