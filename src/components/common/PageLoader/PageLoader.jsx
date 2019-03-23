import React, { lazy, Suspense } from 'react';

import Placeholder from '../Placeholder';

// Import pages on-demand
const Portfolio = lazy(() => import('../../scenes/Portfolio'));
const Settings = lazy(() => import('../../scenes/Settings'));
const Transaction = lazy(() => import('../../scenes/Transaction'));

const commonProps = {
	className: 'page__placeholder',
	description: 'Loading page, please wait...',
	isLoading: true
};

const PortfolioPage = props => {
	return (
		<Suspense fallback={<Placeholder title="Porfolio" {...commonProps} />}>
			<Portfolio {...props} />
		</Suspense>
	);
};

const SettingsPage = props => {
	return (
		<Suspense fallback={<Placeholder title="Settings" {...commonProps} />}>
			<Settings {...props} />
		</Suspense>
	);
};

const TransactionPage = props => {
	return (
		<Suspense fallback={<Placeholder title="Transaction" {...commonProps} />}>
			<Transaction {...props} />
		</Suspense>
	);
};

export { PortfolioPage, SettingsPage, TransactionPage };
