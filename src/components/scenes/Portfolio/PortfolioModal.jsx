import React from 'react';

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

export default stopScroll(PortfolioModal);
