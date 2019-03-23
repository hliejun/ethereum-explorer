import React, { useEffect } from 'react';

import Construction from '../../common/Construction';

import {
	MISSING_REDIRECT_LINK,
	MISSING_REDIRECT_TEXT,
	MISSING_SUBTITLE,
	MISSING_TITLE
} from '../../../constants';

import './_missing.scss';

const Missing = ({ history, reset, setTitle }) => {
	const title = MISSING_TITLE;

	useEffect(() => {
		if (setTitle) {
			setTitle(title);
		}
		return () => {
			if (reset) {
				reset();
			}
		};
	}, [title]);

	return (
		<div className="page missing">
			<Construction
				className="missing__under-construction"
				subtitle={MISSING_SUBTITLE}
				title={MISSING_TITLE}
			>
				<button
					className="missing__link"
					onClick={() => history.push(MISSING_REDIRECT_LINK)}
					type="button"
				>
					{MISSING_REDIRECT_TEXT}
				</button>
			</Construction>
		</div>
	);
};

export default Missing;
