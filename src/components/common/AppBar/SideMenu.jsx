import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import clns from 'classnames';

import { stopScrollPropagation } from '../eventHandling';

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

import './_sidemenu.scss';

const MenuHeader = ({ className, icon: Icon, link, title }) => (
	<div className={clns('side-menu__header', className)}>
		<Link to={link}>
			<Icon className="header__glyph" />
			<span className="header__title monotype">{title}</span>
		</Link>
	</div>
);

const MenuSection = ({ children, className, label }) => (
	<div className={clns('side-menu__section', className)}>
		{label != null && <span className="side-menu__section-label">{label}</span>}
		<div className="section__items">{children}</div>
	</div>
);

const MenuItem = ({ className, icon: Icon, label, onClick }) => (
	<button
		className={clns('side-menu__item', className)}
		onClick={onClick}
		type="button"
	>
		<Icon className="item__glyph" />
		<span className="item__label">{label}</span>
	</button>
);

const LinkedMenuItem = withRouter(({ history, link, ...passthroughProps }) => (
	<MenuItem {...passthroughProps} onClick={() => history.push(link)} />
));

const newTab = url => () => window.open(url, '_blank');

const SideMenu = React.forwardRef(({ className, onLogout }, ref) => (
	<div
		className={clns('side-menu', className)}
		onClick={event => event.stopPropagation()}
		ref={ref}
		role="presentation"
	>
		<MenuHeader icon={Tx} link="/app" title="TX ETHEREUM EXPLORER" />
		<div className="side-menu__sections">
			<MenuSection>
				<LinkedMenuItem icon={Home} label="Home" link="/app" />
				<LinkedMenuItem
					icon={Portfolio}
					label="Portfolio"
					link="/app/portfolio"
				/>
				<LinkedMenuItem icon={Profile} label="Profile" link="/app/profile" />
			</MenuSection>
			<MenuSection label="MEDIA">
				<MenuItem icon={About} label="About" onClick={newTab('/landing')} />
				<MenuItem
					icon={Repository}
					label="Repository"
					onClick={newTab('https://github.com/hliejun')}
				/>
				<MenuItem
					icon={Web}
					label="@hliejun"
					onClick={newTab('https://hliejun.github.io')}
				/>
			</MenuSection>
			<MenuSection label="LEGAL">
				<MenuItem
					icon={Privacy}
					label="Privacy"
					onClick={newTab('https://www.google.com')}
				/>
				<MenuItem
					icon={Terms}
					label="Terms of Service"
					onClick={newTab('https://www.google.com')}
				/>
			</MenuSection>
			<MenuSection label="APP">
				<LinkedMenuItem icon={Settings} label="Settings" link="/app/settings" />
				<MenuItem icon={Logout} label="Log Out" onClick={onLogout} />
			</MenuSection>
		</div>
	</div>
));

export default stopScrollPropagation(SideMenu);
