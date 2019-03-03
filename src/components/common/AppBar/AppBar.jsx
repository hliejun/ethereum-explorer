import React from 'react';
import clns from 'classnames';

import { RouterContext } from '../../Router';
import Modal from '../Modal';
import SideMenu from './SideMenu';

import Back from '../../../assets/icons/back.svg';
import Menu from '../../../assets/icons/menu.svg';

// TODO: Animate menu in and out (inside SideMenu.jsx using transition events)

// TODO: Freeze scroll on main page (float show menu state to parent)

class AppBar extends React.Component {
  static contextType = RouterContext;

  constructor(props) {
  	super(props);

  	this.toggleMenu = this.toggleMenu.bind(this);

  	this.state = {
  		showMenu: false
  	};
  }

  toggleMenu() {
  	this.setState(currentState => ({ showMenu: !currentState.showMenu }));
  }

  render() {
  	const { history } = this.context;
  	const { useBackLink, title, subtitle, options, className } = this.props;
  	const { showMenu } = this.state;

  	const Glyph = useBackLink ? Back : Menu;
  	const leftButton = (
  		<button
  			className={clns('app-bar__button', {
  				'app-bar__button--back': useBackLink,
  				'app-bar__button--menu': !useBackLink
  			})}
  			onClick={useBackLink ? history.goBack : this.toggleMenu}
  			type="button"
  		>
  			<Glyph className="app-bar__button-glyph" />
  		</button>
  	);

  	const sideMenuModal = (
  		<button
  			className="app-bar__menu-portal"
  			onClick={this.toggleMenu}
  			type="button"
  		>
  			<Modal>
  				<div className="app-bar__modal-mask">
  					<SideMenu className="app-bar__side-menu" />
  				</div>
  			</Modal>
  		</button>
  	);

  	return (
  		<div className={clns('app-bar', 'app-bar--normal', className)}>
  			{leftButton}
  			<div className="app-bar__title-set">
  				<span className="title-set__title">{title}</span>
  				<span className="title-set__subtitle">{subtitle}</span>
  			</div>
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
  			{showMenu && sideMenuModal}
  		</div>
  	);
  }
}

export default AppBar;
