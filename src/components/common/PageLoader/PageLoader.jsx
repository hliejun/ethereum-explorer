import React, { lazy, Suspense } from 'react';

import Placeholder from '../Placeholder';

import {
	PAGE_LOADER_DESCRIPTION,
	PAGE_LOADER_TITLES
} from '../../../constants';

// Import pages on-demand
const Portfolio = lazy(() => import('../../scenes/Portfolio'));
const Privacy = lazy(() => import('../../scenes/Privacy'));
const Settings = lazy(() => import('../../scenes/Settings'));
const Terms = lazy(() => import('../../scenes/Terms'));
const Transaction = lazy(() => import('../../scenes/Transaction'));

const commonProps = {
	className: 'page__placeholder',
	description: PAGE_LOADER_DESCRIPTION,
	isLoading: true
};

const PortfolioPage = props => {
	return (
		<Suspense
			fallback={
				<Placeholder title={PAGE_LOADER_TITLES.portfolio} {...commonProps} />
			}
		>
			<Portfolio {...props} />
		</Suspense>
	);
};

const PrivacyPage = props => {
	return (
		<Suspense
			fallback={
				<Placeholder title={PAGE_LOADER_TITLES.privacy} {...commonProps} />
			}
		>
			<Privacy {...props} />
		</Suspense>
	);
};

const SettingsPage = props => {
	return (
		<Suspense
			fallback={
				<Placeholder title={PAGE_LOADER_TITLES.settings} {...commonProps} />
			}
		>
			<Settings {...props} />
		</Suspense>
	);
};

const TermsPage = props => {
	return (
		<Suspense
			fallback={
				<Placeholder title={PAGE_LOADER_TITLES.terms} {...commonProps} />
			}
		>
			<Terms {...props} />
		</Suspense>
	);
};

const TransactionPage = props => {
	return (
		<Suspense
			fallback={
				<Placeholder title={PAGE_LOADER_TITLES.transaction} {...commonProps} />
			}
		>
			<Transaction {...props} />
		</Suspense>
	);
};

export { PortfolioPage, PrivacyPage, SettingsPage, TermsPage, TransactionPage };
