import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import About from '../../../assets/icons/about.svg';
import Home from '../../../assets/icons/home.svg';
import Logout from '../../../assets/icons/exit.svg';
import Portfolio from '../../../assets/icons/balance.svg';
import Privacy from '../../../assets/icons/privacy.svg';
import Profile from '../../../assets/icons/account.svg';
import Repository from '../../../assets/icons/code.svg';
import Settings from '../../../assets/icons/settings.svg';
import Terms from '../../../assets/icons/terms.svg';
import Tx from '../../../assets/icons/tx.svg';
import Web from '../../../assets/icons/link.svg';

const MenuHeader = props => {
	const { icon: Icon, link, title } = props;
	return (
		<div className="side-menu__header">
			<Link to={link}>
				<Icon className="header__glyph" />
				<span className="header__title monotype">{title}</span>
			</Link>
		</div>
	);
};

const MenuSection = props => {
	const { label, children } = props;
	return (
		<div className="side-menu__section">
			{label != null && <span className="section__label">{label}</span>}
			<div className="section__items">{children}</div>
		</div>
	);
};

const MenuItem = props => {
	const { icon: Icon, label, onClick } = props;
	return (
		<button className="side-menu__item" onClick={onClick} type="button">
			<Icon className="item__glyph" />
			<span className="item__label">{label}</span>
		</button>
	);
};

const LinkedMenuItem = withRouter(({ history, link, ...passthroughProps }) => (
	<MenuItem {...passthroughProps} onClick={() => history.push(link)} />
));

const SideMenu = () => (
	<div className="side-menu">
		<MenuHeader icon={Tx} link="/app" title="TX ETHEREUM EXPLORER" />
		<div className="side-menu__sections">
			<MenuSection label={null}>
				<LinkedMenuItem icon={Home} label="Home" link="/app" />
				<LinkedMenuItem
					icon={Portfolio}
					label="Portfolio"
					link="/app/portfolio"
				/>
				<LinkedMenuItem icon={Profile} label="Profile" link="/app/profile" />
			</MenuSection>
			<MenuSection label="MEDIA">
				<MenuItem
					icon={About}
					label="About"
					onClick={() => window.open('/landing', '_blank')}
				/>
				<MenuItem
					icon={Repository}
					label="Repository"
					onClick={() => window.open('https://github.com/hliejun', '_blank')}
				/>
				<MenuItem
					icon={Web}
					label="@hliejun"
					onClick={() => window.open('https://hliejun.github.io', '_blank')}
				/>
			</MenuSection>
			<MenuSection label="LEGAL">
				<MenuItem
					icon={Privacy}
					label="Privacy"
					onClick={() => window.open('https://www.google.com', '_blank')}
				/>
				<MenuItem
					icon={Terms}
					label="Terms of Service"
					onClick={() => window.open('https://www.google.com', '_blank')}
				/>
			</MenuSection>
			<MenuSection label="APP">
				<LinkedMenuItem icon={Settings} label="Settings" link="/app/settings" />
				<MenuItem
					icon={Logout}
					label="Log Out"
					onClick={() => {
						/* Dispatch logout action */
					}}
				/>
			</MenuSection>
		</div>
	</div>
);

export default SideMenu;
