import React, { useState } from 'react';

// TODO: Implement component

const Settings = () => {
	const [name, setName] = useState('settings');
	return (
		<div className="page settings">
			<input
				id="name"
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
		</div>
	);
};

export default Settings;
