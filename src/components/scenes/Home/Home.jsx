import React, { useState } from 'react';

// TODO: Implement component

const Home = () => {
	const [name, setName] = useState('home');
	return (
		<div className="page home">
			<input
				id="name"
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
		</div>
	);
};

export default Home;
