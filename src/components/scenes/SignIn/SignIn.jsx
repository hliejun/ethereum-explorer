import React, { useState } from 'react';

// TODO: Implement component

const SignIn = () => {
	const [name, setName] = useState('login');
	return (
		<div className="page sign-in">
			<input
				id="name"
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
		</div>
	);
};

export default SignIn;
