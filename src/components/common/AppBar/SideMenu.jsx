import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clns from 'classnames';

import { stopScrollPropagation } from '../eventHandling';

import Home from '../../../assets/icons/home.svg';
import Portfolio from '../../../assets/icons/balance.svg';
import Privacy from '../../../assets/icons/privacy.svg';
import Profile from '../../../assets/icons/account.svg';
import Repository from '../../../assets/icons/code.svg';
import Settings from '../../../assets/icons/settings.svg';
import Terms from '../../../assets/icons/terms.svg';
import Tx from '../../../assets/icons/tx.svg';
import Web from '../../../assets/icons/link.svg';

import './_sidemenu.scss';

const MenuHeader = ({ className, icon: Icon, link, onClick, title }) => (
	<div
		className={clns('side-menu__header', className)}
		onClick={onClick}
		role="presentation"
	>
		<Link to={link}>
			{Icon && <Icon className="header__glyph" />}
			<span className="header__title monotype">{title}</span>
		</Link>
	</div>
);

MenuHeader.propTypes = {
	className: PropTypes.string,
	icon: PropTypes.elementType,
	link: PropTypes.string,
	onClick: PropTypes.func,
	title: PropTypes.string.isRequired
};

MenuHeader.defaultProps = {
	className: null,
	icon: null,
	link: null,
	onClick: () => {}
};

const MenuSection = ({ children, className, label }) => (
	<div className={clns('side-menu__section', className)}>
		{label && <span className="side-menu__section-label">{label}</span>}
		<div className="section__items">{children}</div>
	</div>
);

MenuSection.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	label: PropTypes.string
};

MenuSection.defaultProps = {
	className: null,
	label: null
};

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

MenuItem.propTypes = {
	className: PropTypes.string,
	icon: PropTypes.elementType.isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

MenuItem.defaultProps = {
	className: null
};

const LinkedMenuItem = withRouter(
	({ history, link, onClick, ...passthroughProps }) => (
		<MenuItem
			{...passthroughProps}
			onClick={() => {
				history.push(link);
				onClick();
			}}
		/>
	)
);

LinkedMenuItem.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}),
	link: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

LinkedMenuItem.defaultProps = {
	history: {
		push: () => {}
	}
};

const SideMenu = React.forwardRef(({ className, handleClose }, ref) => {
	const close = () => {
		handleClose();
	};
	const newTab = url => () => {
		window.open(url, '_blank');
		close();
	};
	return (
		<div
			className={clns('side-menu', className)}
			onClick={event => event.stopPropagation()}
			ref={ref}
			role="presentation"
		>
			<MenuHeader
				icon={Tx}
				link="/app"
				onClick={close}
				title="TX ETHEREUM EXPLORER"
			/>
			<div className="side-menu__sections">
				<MenuSection>
					<LinkedMenuItem
						icon={Home}
						label="Home"
						link="/app"
						onClick={close}
					/>
					<LinkedMenuItem
						icon={Portfolio}
						label="Portfolio"
						link="/app/portfolio"
						onClick={close}
					/>
					<LinkedMenuItem
						icon={Profile}
						label="Profile"
						link="/app/profile"
						onClick={close}
					/>
				</MenuSection>
				<MenuSection label="MEDIA">
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
					<LinkedMenuItem
						icon={Settings}
						label="Settings"
						link="/app/settings"
						onClick={close}
					/>
				</MenuSection>
			</div>
		</div>
	);
});

SideMenu.propTypes = {
	className: PropTypes.string,
	handleClose: PropTypes.func.isRequired
};

SideMenu.defaultProps = {
	className: null
};

export default stopScrollPropagation(SideMenu);
