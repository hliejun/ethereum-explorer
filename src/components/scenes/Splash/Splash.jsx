import React, { useState } from 'react';

// TODO: Implement component

const Splash = () => {
	const [name, setName] = useState('splash');
	return (
		<div className="page splash">
			<input
				id="name"
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
		</div>
	);
};

export default Splash;
