import React from 'react';
import PropTypes from 'prop-types';

import { Section } from '../../common/Sections';
import ItemRow from '../../common/ItemRow';

import Gas from '../../../assets/icons/gas.svg';
import Limit from '../../../assets/icons/limit.svg';
import Price from '../../../assets/icons/crypto.svg';
import Total from '../../../assets/icons/total.svg';
import Usage from '../../../assets/icons/usage.svg';

const GasSection = ({ className, cumulativeUsed, price, used, value }) => (
	<Section
		className={className}
		footer="Units are in Gwei; 1ETH = 1,000,000,000 Gwei"
		icon={Gas}
		title="Gas Details"
	>
		<ItemRow
			className="gas__row gas__row--value"
			description="Limit placed on transaction fee"
			icon={Limit}
			label="Limit"
			value={value}
		/>
		<ItemRow
			className="gas__row gas__row--price"
			description="Transaction tax rate; higher rate increases mining speed"
			icon={Price}
			label="Price"
			value={price}
		/>
		<ItemRow
			className="gas__row gas__row--used"
			description="Eventual transaction fee incurred by this transaction"
			icon={Usage}
			label="Used"
			value={used}
		/>
		<ItemRow
			className="gas__row gas__row--cumulative"
			description="Total accumulated fee paid for the transaction block (inclusive)"
			icon={Total}
			label="Cumulative used"
			value={cumulativeUsed}
		/>
	</Section>
);

GasSection.propTypes = {
	className: PropTypes.string,
	cumulativeUsed: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	used: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired
};

GasSection.defaultProps = {
	className: null
};

export default GasSection;
