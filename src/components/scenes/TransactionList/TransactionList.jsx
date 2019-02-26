import React, { useState } from 'react';

// TODO: Implement component

const TransactionList = () => {
	const [name, setName] = useState('list');
	return (
		<div className="page transaction-list">
			<input
				id="name"
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
		</div>
	);
};

export default TransactionList;
