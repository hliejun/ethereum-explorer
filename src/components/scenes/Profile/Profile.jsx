import React, { useState } from 'react';

// TODO: Implement component

const Profile = () => {
	const [name, setName] = useState('profile');
	return (
		<div className="page profile">
			<input
				id="name"
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
		</div>
	);
};

export default Profile;
