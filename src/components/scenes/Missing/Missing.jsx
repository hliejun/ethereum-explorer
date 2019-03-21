import React, { useEffect } from 'react';

import Construction from '../../common/Construction';

import './_missing.scss';

const Home = ({ history, reset, setTitle }) => {
	const title = 'Page Not Found';

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
				subtitle="The URL you have entered is invalid."
				title="Page Not Found"
			>
				<button
					className="missing__link"
					onClick={() => history.push('/app/portfolio')}
					type="button"
				>
          Go to Portfolio
				</button>
			</Construction>
		</div>
	);
};

export default Home;
