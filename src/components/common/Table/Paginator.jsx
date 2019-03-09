import React from 'react';
import clns from 'classnames';

import First from '../../../assets/icons/first.svg';
import Last from '../../../assets/icons/last.svg';
import Next from '../../../assets/icons/next.svg';
import Prev from '../../../assets/icons/prev.svg';

import './_paginator.scss';

const Paginator = ({ className, currentPage, lastPage, onPageChange }) => {
	const manualPageInput = React.createRef();
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
				<span className="table-paginator__separator">&nbsp;out of&nbsp;</span>
				<span className="table-paginator__last-page">{lastPage} pages</span>
			</div>
			<button
				className="table-paginator__button"
				onClick={() => onPageChange(1)}
				type="button"
			>
				<First className="table-paginator__glyph" />
			</button>
			<button
				className="table-paginator__button"
				disabled={currentPage === 1}
				key={`prev-${currentPage}`}
				onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
				type="button"
			>
				<Prev className="table-paginator__glyph" />
			</button>
			<button
				className="table-paginator__button"
				disabled={currentPage === lastPage}
				key={`next-${currentPage}`}
				onClick={() => onPageChange(Math.min(currentPage + 1, lastPage))}
				type="button"
			>
				<Next className="table-paginator__glyph" />
			</button>
			<button
				className="table-paginator__button"
				onClick={() => onPageChange(lastPage)}
				type="button"
			>
				<Last className="table-paginator__glyph" />
			</button>
		</div>
	);
};

export default Paginator;
