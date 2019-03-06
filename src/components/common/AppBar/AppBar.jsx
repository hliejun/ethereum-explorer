import React from 'react';
import clns from 'classnames';

import { RouterContext } from '../../Router';
import Modal from '../Modal';
import SideMenu from './SideMenu';

import Back from '../../../assets/icons/back.svg';
import Menu from '../../../assets/icons/menu.svg';

class AppBar extends React.Component {
  static contextType = RouterContext;

  constructor(props) {
  	super(props);
  	this.state = {
  		showMenu: false
  	};
  }

  toggleMenu = () => {
  	this.setState(currentState => ({ showMenu: !currentState.showMenu }));
  };

  renderLeftButton = () => {
  	const { history } = this.context;
  	const { useBackLink } = this.props;
  	const Glyph = useBackLink ? Back : Menu;
  	return (
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
  };

  renderSideMenuModal = () => (
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

  render() {
  	const { title, subtitle, options, className } = this.props;
  	const { showMenu } = this.state;
  	return (
  		<div className={clns('app-bar', 'app-bar--normal', className)}>
  			{this.renderLeftButton()}
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
  			{showMenu && this.renderSideMenuModal()}
  		</div>
  	);
  }
}

export default AppBar;
