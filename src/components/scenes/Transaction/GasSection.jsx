import React from 'react';
import PropTypes from 'prop-types';

import { Section } from '../../common/Sections';
import ItemRow from '../../common/ItemRow';

import Gas from '../../../assets/icons/glyphs/gas.svg';
import Limit from '../../../assets/icons/glyphs/limit.svg';
import Fee from '../../../assets/icons/glyphs/currency.svg';
import Price from '../../../assets/icons/glyphs/crypto.svg';
import Total from '../../../assets/icons/glyphs/total.svg';
import Usage from '../../../assets/icons/glyphs/usage.svg';

const GasSection = ({ className, cumulativeUsed, fee, limit, price, used }) => (
	<Section
		className={className}
		footer="Higher gas price increases mining speed."
		icon={Gas}
		title="Gas Details"
	>
		<ItemRow
			className="gas__row gas__row--fee"
			description="Fee for this transaction (ETH)"
			icon={Fee}
			label="Fee"
			value={fee}
		/>
		<ItemRow
			className="gas__row gas__row--value"
			description="Limit placed on gas used"
			icon={Limit}
			label="Limit"
			value={limit}
		/>
		<ItemRow
			className="gas__row gas__row--price"
			description="Price per unit gas used (ETH)"
			icon={Price}
			label="Price"
			value={price}
		/>
		<ItemRow
			className="gas__row gas__row--used"
			description="Gas used for this transaction"
			icon={Usage}
			label="Used"
			value={used}
		/>
		<ItemRow
			className="gas__row gas__row--cumulative"
			description="Total accumulated gas used for this block (inclusive)"
			icon={Total}
			label="Cumulative used"
			value={cumulativeUsed}
		/>
	</Section>
);

GasSection.propTypes = {
	className: PropTypes.string,
	cumulativeUsed: PropTypes.string.isRequired,
	fee: PropTypes.string.isRequired,
	limit: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	used: PropTypes.string.isRequired
};

GasSection.defaultProps = {
	className: null
};

export default GasSection;
