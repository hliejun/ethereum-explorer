import TxIcon from '../assets/icons/logos/tx.svg';

import China from '../assets/icons/flags/china.svg';
import Japan from '../assets/icons/flags/japan.svg';
import Korea from '../assets/icons/flags/korea.svg';
import Singapore from '../assets/icons/flags/singapore.svg';
import UnitedKingdom from '../assets/icons/flags/uk.svg';
import UnitedStates from '../assets/icons/flags/us.svg';

// App

export const APP_ICON = TxIcon;

export const APP_TITLE = 'Tx Ethereum Explorer';

// App Bar

export const APP_DEFAULT_BACKLINK = '/app/portfolio';

// Notification

export const NOTIFICATION_DEFAULT_TITLE = 'Notification';

export const NOTIFICATION_DEFAULT_DISMISS = 'Dismiss';

export const NOTIFICATION_CLIPBOARD = {
	description:
    'The details for this transaction has been copied to your clipboard!',
	subtitle: 'Copy to Clipboard'
};

// Modal

export const MODAL_ACTIVE_CLASS = 'modal-open';

// Page Loader

export const PAGE_LOADER_TITLES = {
	portfolio: 'Portfolio',
	settings: 'Settings',
	transaction: 'Transaction'
};

export const PAGE_LOADER_DESCRIPTION = 'Loading page, please wait...';

// Date

export const DATE_FORMAT_LONG = 'DD/MM/YY h:mmA';

export const DATE_FORMAT_SHORT = 'D/M h:mmA';

// Currency

export const CURRENCY_DEFAULT = 'USD';

export const CURRENCY_SYMBOLS = {
	CNY: '¥',
	ETH: 'Ξ',
	GBP: '£',
	JPY: '¥',
	KRW: '₩',
	SGD: '$',
	USD: '$'
};

export const CURRENCY_OPTIONS = [
	{ label: 'British Pound', value: 'GBP' },
	{ label: 'Chinese Yuan', value: 'CNY' },
	{ label: 'Japanese Yen', value: 'JPY' },
	{ label: 'Korean Won', value: 'KRW' },
	{ label: 'Singapore Dollars', value: 'SGD' },
	{ label: 'U.S Dollars', value: 'USD' }
];

// Countries

export const COUNTRY_ICONS = {
	CNY: China,
	GBP: UnitedKingdom,
	JPY: Japan,
	KRW: Korea,
	SGD: Singapore,
	USD: UnitedStates
};

// Construction

export const CONSTRUCTION_DESCRIPTOR =
  'This page is currently under construction. Please check back later.';

// Missing

export const MISSING_REDIRECT_TEXT = 'Go to Portfolio';

export const MISSING_REDIRECT_LINK = '/app/portfolio';

export const MISSING_TITLE = 'Page Not Found';

export const MISSING_SUBTITLE = 'The URL you have entered is invalid.';

// Portfolio

export const PORTFOLIO_SECTION_LABELS = {
	history: 'Transaction History',
	options: 'View Options'
};

// Transactions Viewer

export const VIEWER_PAGE_SIZE = 20;

export const VIEWER_LOADING_SUBTITLE = 'Loading, please wait...';

// Dashboard

export const DASHBOARD_LABELS = {
	balance: 'Balance',
	local: 'Localise:',
	nett: 'SUBTOTAL',
	received: 'INCOMING',
	sent: 'OUTGOING'
};

export * from './form';
export * from './list';
export * from './menu';
export * from './placeholder';
export * from './settings';
export * from './table';
export * from './transaction';
