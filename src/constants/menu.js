import HomeIcon from '../assets/icons/glyphs/home.svg';
import PortfolioIcon from '../assets/icons/glyphs/balance.svg';
import PrivacyIcon from '../assets/icons/glyphs/privacy.svg';
import ProfileIcon from '../assets/icons/glyphs/account.svg';
import RepositoryIcon from '../assets/icons/glyphs/code.svg';
import SettingsIcon from '../assets/icons/glyphs/settings.svg';
import TermsIcon from '../assets/icons/glyphs/terms.svg';
import WebIcon from '../assets/icons/glyphs/link.svg';

// Links

export const LINK_HOME = '/app';

export const LINK_PORTFOLIO = '/app/portfolio';

export const LINK_PRIVACY = '/app/privacy';

export const LINK_PROFILE = '/app/profile';

export const LINK_SETTINGS = '/app/settings';

export const LINK_TERMS = '/app/terms';

export const LINK_TRANSACTION = '/app/transaction';

// Menu

export const MENU_ITEMS = {
	HOME: {
		icon: HomeIcon,
		label: 'Home',
		link: LINK_HOME
	},
	PORTFOLIO: {
		icon: PortfolioIcon,
		label: 'Portfolio',
		link: LINK_PORTFOLIO
	},
	PRIVACY: {
		icon: PrivacyIcon,
		label: 'Privacy',
		link: LINK_PRIVACY
	},
	PROFILE: {
		icon: ProfileIcon,
		label: 'Profile',
		link: LINK_PROFILE
	},
	REPOSITORY: {
		icon: RepositoryIcon,
		label: 'Repository',
		link: 'https://github.com/hliejun'
	},
	SETTINGS: {
		icon: SettingsIcon,
		label: 'Settings',
		link: LINK_SETTINGS
	},
	TERMS: {
		icon: TermsIcon,
		label: 'Terms of Service',
		link: LINK_TERMS
	},
	WEBSITE: {
		icon: WebIcon,
		label: '@hliejun',
		link: 'https://hliejun.github.io'
	}
};

export const MENU_LABELS = {
	app: 'APP',
	legal: 'LEGAL',
	media: 'MEDIA'
};
