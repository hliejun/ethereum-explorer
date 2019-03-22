import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Section } from '../../common/Sections';
import ItemRow from '../../common/ItemRow';

import FeeIcon from '../../../assets/icons/glyphs/currency.svg';
import GasIcon from '../../../assets/icons/glyphs/gas.svg';
import LimitIcon from '../../../assets/icons/glyphs/limit.svg';
import PriceIcon from '../../../assets/icons/glyphs/crypto.svg';
import TotalIcon from '../../../assets/icons/glyphs/total.svg';
import UsageIcon from '../../../assets/icons/glyphs/usage.svg';

const GAS_SECTION_DATA = {
	footer: 'Higher gas price increases mining speed.',
	icon: GasIcon,
	title: 'Gas Details'
};

const GAS_SUBSECTIONS_DATA = {
	cumulative: {
		description: 'Total accumulated gas used for this block (inclusive)',
		icon: TotalIcon,
		label: 'Cumulative used'
	},
	fee: {
		description: 'Fee for this transaction (ETH)',
		icon: FeeIcon,
		label: 'Fee'
	},
	limit: {
		description: 'Limit placed on gas used',
		icon: LimitIcon,
		label: 'Limit'
	},
	price: {
		description: 'Price per unit gas used (ETH)',
		icon: PriceIcon,
		label: 'Price'
	},
	used: {
		description: 'Gas used for this transaction',
		icon: UsageIcon,
		label: 'Used'
	}
};

const GasSection = ({ className, cumulativeUsed, fee, limit, price, used }) => (
	<Section className={className} {...GAS_SECTION_DATA}>
		<ItemRow
			className="gas__row gas__row--fee"
			value={fee}
			{...GAS_SUBSECTIONS_DATA.fee}
		/>
		<ItemRow
			className="gas__row gas__row--limit"
			value={limit}
			{...GAS_SUBSECTIONS_DATA.limit}
		/>
		<ItemRow
			className="gas__row gas__row--price"
			value={price}
			{...GAS_SUBSECTIONS_DATA.price}
		/>
		<ItemRow
			className="gas__row gas__row--used"
			value={used}
			{...GAS_SUBSECTIONS_DATA.used}
		/>
		<ItemRow
			className="gas__row gas__row--cumulative"
			value={cumulativeUsed}
			{...GAS_SUBSECTIONS_DATA.cumulative}
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

export default memo(GasSection);
