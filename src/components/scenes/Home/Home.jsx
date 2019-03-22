import React, { useEffect } from 'react';

import Construction from '../../common/Construction';

import HomeIcon from '../../../assets/icons/glyphs/home.svg';

const Home = ({ reset, setSubtitle, setTitle }) => {
	const title = 'Home';
	const subtitle = 'Under Construction';

	useEffect(() => {
		setTitle(title);
		setSubtitle(subtitle);
		return () => {
			reset();
		};
	}, [title, subtitle]);

	return (
		<div className="page home">
			<Construction className="home__under-construction" icon={HomeIcon} />
		</div>
	);
};

export default Home;
