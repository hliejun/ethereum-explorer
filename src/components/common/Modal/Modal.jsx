import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const disableScroll = event => {
	event.preventDefault();
};

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.element = document.createElement('div');
		this.element.classList.add('modal');
	}

	componentDidMount() {
		document.body.classList.add('modal-open');
		modalRoot.addEventListener('touchmove', disableScroll, false);
		modalRoot.appendChild(this.element);
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.element);
		modalRoot.removeEventListener('touchmove', disableScroll, false);
		document.body.classList.remove('modal-open');
	}

	render() {
		const { children } = this.props;
		return ReactDOM.createPortal(children, this.element);
	}
}

export default Modal;
