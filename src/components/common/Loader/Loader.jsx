import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import './_loader.scss';

const Loader = ({ className, isLoading }) => (
	<div
		className={clns('loader', className)}
		style={{ opacity: isLoading ? '1' : '0' }}
	>
		<svg className="loader__glyph">
			<circle
				className="path"
				cx="50"
				cy="50"
				fill="none"
				r="20"
				strokeMiterlimit="10"
				strokeWidth="3"
			/>
		</svg>
	</div>
);

Loader.propTypes = {
	className: PropTypes.string,
	isLoading: PropTypes.bool.isRequired
};

Loader.defaultProps = {
	className: null
};

export default memo(Loader);
