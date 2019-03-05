import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.element = document.createElement('div');
		this.element.classList.add('modal');
	}

	componentDidMount() {
		modalRoot.appendChild(this.element);
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.element);
		document.body.classList.remove('modal-open');
	}

	render() {
		const { children } = this.props;
		return ReactDOM.createPortal(children, this.element);
	}
}

export default Modal;
