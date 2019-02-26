import React, { useState } from 'react';

// TODO: Implement component

const Register = () => {
	const [name, setName] = useState('sign-up');
	return (
		<div className="page register">
			<input
				id="name"
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
		</div>
	);
};

export default Register;
