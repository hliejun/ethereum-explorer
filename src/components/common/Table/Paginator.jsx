import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import FirstIcon from '../../../assets/icons/glyphs/first.svg';
import LastIcon from '../../../assets/icons/glyphs/last.svg';
import NextIcon from '../../../assets/icons/glyphs/next.svg';
import PrevIcon from '../../../assets/icons/glyphs/prev.svg';

import './_paginator.scss';

const Paginator = ({ className, currentPage, lastPage, onPageChange }) => {
	// Create reference to paginator manual input
	const manualPageInput = React.createRef();

	// Trigger subscribed callback when page input is updated
	const onManualPageChange = event => {
		const manualPage = parseInt(manualPageInput.current.value, 10);
		if (event.key === 'Enter' && manualPage <= lastPage && manualPage >= 1) {
			onPageChange(manualPage);
		}
	};

	return (
		<div className={clns('table-paginator', className)}>
			<div className="table-paginator__manual-paging">
				<input
					className="table-paginator__current-page"
					defaultValue={currentPage}
					key={currentPage}
					onKeyPress={onManualPageChange}
					ref={manualPageInput}
					type="number"
				/>
				<span className="table-paginator__last-page">
					{` out of ${lastPage} pages`}
				</span>
			</div>
			<button
				className="table-paginator__button"
				onClick={() => onPageChange(1)}
				type="button"
			>
				<FirstIcon className="table-paginator__glyph" />
			</button>
			<button
				className="table-paginator__button"
				disabled={currentPage === 1}
				key={`prev-${currentPage}`}
				onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
				type="button"
			>
				<PrevIcon className="table-paginator__glyph" />
			</button>
			<button
				className="table-paginator__button"
				disabled={currentPage === lastPage}
				key={`next-${currentPage}`}
				onClick={() => onPageChange(Math.min(currentPage + 1, lastPage))}
				type="button"
			>
				<NextIcon className="table-paginator__glyph" />
			</button>
			<button
				className="table-paginator__button"
				onClick={() => onPageChange(lastPage)}
				type="button"
			>
				<LastIcon className="table-paginator__glyph" />
			</button>
		</div>
	);
};

Paginator.propTypes = {
	className: PropTypes.string,
	currentPage: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
};

Paginator.defaultProps = {
	className: null
};

export default memo(Paginator);
