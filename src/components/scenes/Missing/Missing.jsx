import React, { useState } from 'react';

// TODO: Implement component

const Missing = () => {
	const [name, setName] = useState('404 not found');
	return (
		<div className="page missing">
			<input
				id="name"
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
		</div>
	);
};

export default Missing;
