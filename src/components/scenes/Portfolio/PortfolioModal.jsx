import React from 'react';
import PropTypes from 'prop-types';

import { stopScroll } from '../../common/eventHandling';

const PortfolioModal = React.forwardRef(({ children }, ref) => (
	<div className="portfolio__modal-container" ref={ref}>
		<div
			className="portfolio__modal"
			onClick={event => event.stopPropagation()}
			role="presentation"
		>
			{children}
		</div>
	</div>
));

PortfolioModal.propTypes = {
	children: PropTypes.node.isRequired
};

export default stopScroll(PortfolioModal);
