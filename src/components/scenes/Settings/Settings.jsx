import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clns from 'classnames';

import { getAddress, getCode, getTheme } from '../../../redux/selectors';
import {
	resetSettings,
	setCurrency,
	toggleNightMode
} from '../../../redux/actions/settings';
import { setOfflineEthAddress } from '../../../redux/actions/user';

import { symbols } from '../../common/Currency';

import { ControlledForm, Input, Select } from '../../common/Form';
import { Section, SubSection } from '../../common/Sections';

import AppIcon from '../../../assets/icons/application.svg';
import Reset from '../../../assets/icons/reset.svg';
import UserIcon from '../../../assets/icons/avatar.svg';

import './_settings.scss';

const Settings = ({
	address,
	className,
	clearSettings,
	currency,
	isDarkMode,
	reset,
	setOptions: updateOptions,
	setTitle: updateTitle,
	updateAddress,
	updateCurrency,
	updateNightMode
}) => {
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
		default:
      // do nothing
		}
	};

	const options = [{ handler: clearSettings, icon: Reset, key: 'reset' }];
	const title = 'Transaction Details';

	useEffect(() => {
		updateOptions(options);
		updateTitle(title);
		return () => {
			reset();
		};
	}, [options, title]);

	useEffect(() => {
		if (window) {
			window.scroll(0, 0);
		}
	}, [window]);

	return (
		<div className={clns('page', 'settings', className)}>
			<ControlledForm
				defaultValues={{ address, currency, isDarkMode }}
				id="settings-form"
				onChange={updateSettings}
				values={{ address, currency, isDarkMode }}
			>
				{() => (
					<React.Fragment>
						<Section
							className="settings__section settings__section--app"
							description="View behaviours, customisations and themes, etc."
							icon={AppIcon}
							title="Application Settings"
						>
							<SubSection
								className="settings__subsection settings__subsection--currency"
								description="Conversion rate for localising Ethereum"
								title="Preferred Currency"
							>
								<Select
									className="settings__field--currency"
									name="currency"
									options={[
										{ label: 'British Pound', value: 'GBP' },
										{ label: 'Chinese Yuan', value: 'CNY' },
										{ label: 'Japanese Yen', value: 'JPY' },
										{ label: 'Korean Won', value: 'KRW' },
										{ label: 'Singapore Dollars', value: 'SGD' },
										{ label: 'U.S Dollars', value: 'USD' }
									]}
								/>
							</SubSection>
							<SubSection
								className="settings__subsection settings__subsection--theme"
								description="Dark style for low-light environment"
								title="Use Dark Mode"
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
							description="User account, credentials, profile options, etc."
							icon={UserIcon}
							title="User Settings"
						>
							<SubSection
								className="settings__subsection settings__subsection--address"
								description="Designated cryptocurrency account hash"
								title="Ethereum Address"
							>
								<Input
									className="settings__field--address"
									maxLength={42}
									name="address"
									placeholder="Enter your Ethereum address..."
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
	className: PropTypes.string,
	clearSettings: PropTypes.func.isRequired,
	currency: PropTypes.oneOf(Object.keys(symbols)).isRequired,
	isDarkMode: PropTypes.bool.isRequired,
	reset: PropTypes.func.isRequired,
	setOptions: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	updateAddress: PropTypes.func.isRequired,
	updateCurrency: PropTypes.func.isRequired,
	updateNightMode: PropTypes.func.isRequired
};

Settings.defaultProps = {
	address: '',
	className: null
};

const mapStateToProps = state => ({
	address: getAddress(state),
	currency: getCode(state),
	isDarkMode: getTheme(state)
});

const mapDispatchToProps = dispatch => ({
	clearSettings: () => dispatch(resetSettings()),
	updateAddress: address => dispatch(setOfflineEthAddress(address)),
	updateCurrency: currency => dispatch(setCurrency(currency)),
	updateNightMode: () => dispatch(toggleNightMode())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
