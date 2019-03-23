import AppIcon from '../assets/icons/glyphs/application.svg';
import UserIcon from '../assets/icons/glyphs/avatar.svg';

// Page Title

export const SETTINGS_TITLE = 'Settings';

// Input Length

export const SETTINGS_LENGTH_API_KEY = 64;

export const SETTINGS_LENGTH_ETH_ADDRESS = 42;

// Inputs Placeholders

export const SETTINGS_INPUT_PLACEHOLDER_ADDRESS =
  'Enter your Ethereum address...';

export const SETTINGS_INPUT_PLACEHOLDER_API_KEY = 'Enter your API key...';

// Sections / Sub-sections

export const SETTINGS_SECTIONS_DATA = {
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

export const APP_SUBSECTIONS_DATA = {
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

export const USER_SUBSECTIONS_DATA = {
	address: {
		description: 'Designated cryptocurrency account hash',
		title: 'Ethereum Address'
	}
};
