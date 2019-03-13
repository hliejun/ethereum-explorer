import React, { useEffect, useState } from 'react';
import clns from 'classnames';

import { stubbedConversionRates, stubbedTransaction } from './_stubbedValues';
import { countriesToDisplay, countryIcons } from './_constants';
import { copyData, formatTransaction } from './_helper';

import Currency from '../../common/Currency';
import Jumbotron from '../../common/Jumbotron';

import BlockSection from './BlockSection';
import GasSection from './GasSection';
import SourceSection from './SourceSection';

import Copy from '../../../assets/icons/copy.svg';

import './_transaction.scss';

const LocalValues = ({ countries, rates, value }) =>
	countries.map(countryName => {
		const country = rates[countryName];
		const Icon = countryIcons[countryName];
		return country == null ? null : (
			<div
				className={clns(
					'transaction__local-amount',
					`transaction__local-amount--${countryName}`
				)}
				key={country.code}
			>
				{Icon && <Icon className="transaction__glyph" />}
				<Currency
					amount={`$${parseFloat(country.rate) * value}`}
					className="transaction__local-currency"
					code={country.code}
				/>
			</div>
		);
	});

const Transaction = ({
	className,
	// match,
	reset,
	setBackLink: updateBacklink,
	setOptions: updateOptions,
	setSubtitle: updateSubtitle,
	setTitle: updateTitle
}) => {
	const handleCopy = copyData(formatTransaction(stubbedTransaction));
	const options = [{ key: 'copy', Icon: Copy, handler: handleCopy }];
	const title = 'Transaction Details';
	// const subtitle = `ID: ${match.params.id}`;

	const { block, gas, id, source, status, value } = stubbedTransaction;
	const subtitle = `ID: ${id}`;

	const [showId /* , setShowId */] = useState(true);

	useEffect(() => {
		updateSubtitle(showId ? subtitle : null);
		updateBacklink(true);
		updateOptions(options);
		updateTitle(title);
		return () => {
			reset();
		};
	}, [showId]);

	// TODO: Get transaction data by url id param (don't fire if same id)

	// TODO: Convert value to local amounts (all countries) using conversion rates from store

	return (
		<div className={clns('page', 'transaction', className)}>
			<div className="transaction__header">
				<Jumbotron
					className="transaction__values"
					subtitle="Transacted Ether"
					title={<Currency amount={value} code="ETH" />}
				>
					<LocalValues
						countries={countriesToDisplay}
						rates={stubbedConversionRates}
						value={value}
					/>
				</Jumbotron>
			</div>
			<div className="transaction__body">
				<SourceSection
					className="transaction__section transaction__section--source"
					id={id}
					status={status}
					{...source}
				/>
				<BlockSection
					className="transaction__section transaction__section--block"
					{...block}
				/>
				<GasSection
					className="transaction__section transaction__section--gas"
					{...gas}
				/>
			</div>
		</div>
	);
};

export default Transaction;
