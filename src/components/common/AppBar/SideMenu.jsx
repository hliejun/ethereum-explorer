import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import clns from 'classnames';

import { stopScrollPropagation } from '../eventHandling';

import {
	APP_ICON,
	APP_TITLE,
	LINK_HOME,
	MENU_ITEMS,
	MENU_LABELS
} from '../../../constants';

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
	link: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

const SideMenu = React.forwardRef(({ className, handleClose }, ref) => {
	const close = () => {
		handleClose();
	};
	const newTab = url => () => {
		window.open(url, '_blank', 'noopener');
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
				icon={APP_ICON}
				link={LINK_HOME}
				onClick={close}
				title={APP_TITLE}
			/>
			<div className="side-menu__sections">
				<MenuSection>
					<LinkedMenuItem {...MENU_ITEMS.HOME} onClick={close} />
					<LinkedMenuItem {...MENU_ITEMS.PORTFOLIO} onClick={close} />
					<LinkedMenuItem {...MENU_ITEMS.PROFILE} onClick={close} />
				</MenuSection>
				<MenuSection label={MENU_LABELS.media}>
					<MenuItem
						{...MENU_ITEMS.REPOSITORY}
						onClick={newTab(MENU_ITEMS.REPOSITORY.link)}
					/>
					<MenuItem
						{...MENU_ITEMS.WEBSITE}
						onClick={newTab(MENU_ITEMS.WEBSITE.link)}
					/>
				</MenuSection>
				<MenuSection label={MENU_LABELS.legal}>
					<LinkedMenuItem {...MENU_ITEMS.PRIVACY} onClick={close} />
					<LinkedMenuItem {...MENU_ITEMS.TERMS} onClick={close} />
				</MenuSection>
				<MenuSection label={MENU_LABELS.app}>
					<LinkedMenuItem {...MENU_ITEMS.SETTINGS} onClick={close} />
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
