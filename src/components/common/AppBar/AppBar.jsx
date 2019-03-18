import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import clns from 'classnames';

import Modal from '../Modal';
import SideMenu from './SideMenu';

import Back from '../../../assets/icons/back.svg';
import Menu from '../../../assets/icons/menu.svg';

import './_appbar.scss';

const LeftButton = ({ goBack, toggleMenu, useBackLink }) => {
	const Glyph = useBackLink ? Back : Menu;
	return (
		<button
			className={clns('app-bar__button', {
				'app-bar__button--back': useBackLink,
				'app-bar__button--menu': !useBackLink
			})}
			onClick={useBackLink ? goBack : toggleMenu}
			type="button"
		>
			<Glyph className="app-bar__button-glyph" />
		</button>
	);
};

LeftButton.propTypes = {
	goBack: PropTypes.func,
	toggleMenu: PropTypes.func,
	useBackLink: PropTypes.bool
};

LeftButton.defaultProps = {
	goBack: () => {},
	toggleMenu: () => {},
	useBackLink: false
};

const SideMenuModal = ({ toggleMenu }) => (
	<div
		className="app-bar__menu-portal"
		onClick={toggleMenu}
		role="presentation"
	>
		<Modal>
			<SideMenu className="app-bar__side-menu" handleClose={toggleMenu} />
		</Modal>
	</div>
);

SideMenuModal.propTypes = {
	toggleMenu: PropTypes.func.isRequired
};

const HeaderText = ({ subtitle, title }) => (
	<div className="app-bar__title-set">
		<span className="title-set__title">{title}</span>
		{subtitle && <span className="title-set__subtitle">{subtitle}</span>}
	</div>
);

HeaderText.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string
};

HeaderText.defaultProps = {
	subtitle: null
};

const PageOptions = ({ options }) => (
	<div className="app-bar__options">
		{options.map(({ handler, icon: Icon, key }) => (
			<button
				className="app-bar__button app-bar__button--option"
				key={key}
				onClick={handler}
				type="button"
			>
				<Icon className="app-bar__button-glyph" />
			</button>
		))}
	</div>
);

PageOptions.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			handler: PropTypes.func.isRequired,
			icon: PropTypes.elementType.isRequired,
			key: PropTypes.string.isRequired
		})
	).isRequired
};

const AppBar = withRouter(
	({ className, history, options, subtitle, title, useBackLink }) => {
		const [showMenu, setShowMenu] = useState(false);
		const toggleMenu = () => setShowMenu(!showMenu);
		return (
			<div className={clns('app-bar', 'app-bar--normal', className)}>
				<LeftButton
					goBack={() => history.push('/app/portfolio')}
					toggleMenu={toggleMenu}
					useBackLink={useBackLink}
				/>
				<HeaderText title={title} subtitle={subtitle} />
				<PageOptions options={options} />
				{showMenu && <SideMenuModal toggleMenu={toggleMenu} />}
			</div>
		);
	}
);

AppBar.propTypes = {
	className: PropTypes.string,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}),
	options: PageOptions.propTypes.options,
	subtitle: PropTypes.string,
	title: PropTypes.string.isRequired,
	useBackLink: PropTypes.bool.isRequired
};

AppBar.defaultProps = {
	className: null,
	history: {
		push: () => {}
	},
	subtitle: null
};

export default AppBar;
