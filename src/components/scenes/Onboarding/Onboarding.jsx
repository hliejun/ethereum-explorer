import React, { useState } from 'react';

// TODO: Implement component

const Onboarding = () => {
	const [name, setName] = useState('onboarding');
	return (
		<div className="page onboarding">
			<input
				id="name"
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
		</div>
	);
};

export default Onboarding;
