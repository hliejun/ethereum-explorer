import HomeIcon from '../assets/icons/glyphs/home.svg';
import PortfolioIcon from '../assets/icons/glyphs/balance.svg';
import PrivacyIcon from '../assets/icons/glyphs/privacy.svg';
import ProfileIcon from '../assets/icons/glyphs/account.svg';
import RepositoryIcon from '../assets/icons/glyphs/code.svg';
import SettingsIcon from '../assets/icons/glyphs/settings.svg';
import TermsIcon from '../assets/icons/glyphs/terms.svg';
import WebIcon from '../assets/icons/glyphs/link.svg';

export const MENU_ITEMS = {
	HOME: { icon: HomeIcon, label: 'Home', link: '/app' },
	PORTFOLIO: {
		icon: PortfolioIcon,
		label: 'Portfolio',
		link: '/app/portfolio'
	},
	PRIVACY: { icon: PrivacyIcon, label: 'Privacy', link: '/app/privacy' },
	PROFILE: { icon: ProfileIcon, label: 'Profile', link: '/app/profile' },
	REPOSITORY: {
		icon: RepositoryIcon,
		label: 'Repository',
		link: 'https://github.com/hliejun'
	},
	SETTINGS: { icon: SettingsIcon, label: 'Settings', link: '/app/settings' },
	TERMS: { icon: TermsIcon, label: 'Terms of Service', link: '/app/terms' },
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
