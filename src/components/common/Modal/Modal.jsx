import React from 'react';
import ReactDOM from 'react-dom';

import { stopScroll } from '../eventHandling';

import './_modal.scss';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
	componentDidMount() {
		document.body.classList.add('modal-open');
	}

	componentWillUnmount() {
		document.body.classList.remove('modal-open');
	}

	render() {
		const { children, forwardedRef } = this.props;
		const modal = (
			<div className="modal" ref={forwardedRef}>
				{children}
			</div>
		);
		return ReactDOM.createPortal(modal, modalRoot);
	}
}

export default stopScroll(
	// eslint-disable-next-line react/no-multi-comp
	React.forwardRef((props, ref) => <Modal {...props} forwardedRef={ref} />)
);
