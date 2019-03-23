import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Section } from '../../common/Sections';
import ItemRow from '../../common/ItemRow';

import { GAS_SECTION_DATA, GAS_SUBSECTIONS_DATA } from '../../../constants';

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
