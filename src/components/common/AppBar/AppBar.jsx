import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
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

const HeaderText = ({ subtitle, title }) => (
	<div className="app-bar__title-set">
		<span className="title-set__title">{title}</span>
		<span className="title-set__subtitle">{subtitle}</span>
	</div>
);

const PageOptions = ({ options }) => (
	<div className="app-bar__options">
		{options.map(option => (
			<button
				className="app-bar__button app-bar__button--option"
				key={option.key}
				onClick={option.handler}
				type="button"
			>
				<option.Icon className="app-bar__button-glyph" />
			</button>
		))}
	</div>
);

const AppBar = withRouter(
	({ className, history, options, subtitle, title, useBackLink }) => {
		const [showMenu, setShowMenu] = useState(false);
		const toggleMenu = () => setShowMenu(!showMenu);
		return (
			<div className={clns('app-bar', 'app-bar--normal', className)}>
				<LeftButton
					goBack={history.goBack}
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

export default AppBar;
