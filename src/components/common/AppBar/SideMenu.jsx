import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import clns from 'classnames';

import stopScrollPropagation from '../stopScrollPropagation';

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

// TODO: Animate menu in and out (using transition events for mount/unmount)

const MenuHeader = ({ icon: Icon, link, title, className }) => (
	<div className={clns('side-menu__header', className)}>
		<Link to={link}>
			<Icon className="header__glyph" />
			<span className="header__title monotype">{title}</span>
		</Link>
	</div>
);

const MenuSection = ({ label, children, className }) => (
	<div className={clns('side-menu__section', className)}>
		{label != null && <span className="side-menu__section-label">{label}</span>}
		<div className="section__items">{children}</div>
	</div>
);

const MenuItem = ({ icon: Icon, label, onClick, className }) => (
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

const SideMenu = React.forwardRef(({ className, onLogout }, ref) => (
	<div className={clns('side-menu', className)} ref={ref}>
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
				<MenuItem icon={Logout} label="Log Out" onClick={onLogout} />
			</MenuSection>
		</div>
	</div>
));

export default stopScrollPropagation(SideMenu);
