import React, { useEffect } from 'react';

import Construction from '../../common/Construction';

import ProfileIcon from '../../../assets/icons/account.svg';

import './_profile.scss';

const Profile = ({ reset, setSubtitle, setTitle }) => {
	const title = 'Profile';
	const subtitle = 'Under Construction';

	useEffect(() => {
		setTitle(title);
		setSubtitle(subtitle);
		return () => {
			reset();
		};
	}, [title, subtitle]);
	return (
		<div className="page profile">
			<Construction
				className="profile__under-construction"
				icon={ProfileIcon}
			/>
		</div>
	);
};

export default Profile;
