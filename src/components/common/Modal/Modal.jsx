import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { stopScroll } from '../eventHandling';

import { MODAL_ACTIVE_CLASS } from '../../../constants';

import './_modal.scss';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.PureComponent {
	componentDidMount() {
		document.body.classList.add(MODAL_ACTIVE_CLASS);
	}

	componentWillUnmount() {
		document.body.classList.remove(MODAL_ACTIVE_CLASS);
	}

	render() {
		// Provide ref handle for parent components
		const { children, forwardedRef } = this.props;
		const modal = (
			<div className="modal" ref={forwardedRef}>
				{children}
			</div>
		);

		// Render modal into portal in a separate root element
		return ReactDOM.createPortal(modal, modalRoot);
	}
}

Modal.propTypes = {
	children: PropTypes.node.isRequired
};

// Stop underlying div/body from scrolling when modal is active
export default stopScroll(
	// eslint-disable-next-line react/no-multi-comp
	React.forwardRef((props, ref) => <Modal {...props} forwardedRef={ref} />)
);
