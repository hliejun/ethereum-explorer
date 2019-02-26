import React, { useState } from 'react';

// TODO: Implement component

const Transaction = () => {
	const [name, setName] = useState('transaction');
	return (
		<div className="page transaction">
			<input
				id="name"
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
		</div>
	);
};

export default Transaction;
