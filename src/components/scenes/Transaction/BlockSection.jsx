import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Section, SubSection } from '../../common/Sections';

import BlockIcon from '../../../assets/icons/glyphs/block.svg';
import ConfirmationIcon from '../../../assets/icons/glyphs/confirmation.svg';
import HashIcon from '../../../assets/icons/glyphs/hash.svg';
import HeightIcon from '../../../assets/icons/glyphs/height.svg';

const BLOCK_SECTION_DATA = {
	footer: 'More confirmations, better secured transactions.',
	icon: BlockIcon,
	title: 'Block Data'
};

const BLOCK_SUBSECTIONS_DATA = {
	confirmations: {
		description: 'Number of blocks burying this transaction',
		icon: ConfirmationIcon,
		title: 'Confirmations'
	},
	height: {
		description: 'Number of blocks from genesis block',
		icon: HeightIcon,
		title: 'Number/Height'
	},
	id: {
		description: 'Unique block identifier',
		icon: HashIcon,
		title: 'Block Hash'
	}
};

const BlockSection = ({ className, confirmations, height, id }) => (
	<Section className={className} {...BLOCK_SECTION_DATA}>
		<SubSection
			className="block__sub-section block__sub-section--id"
			{...BLOCK_SUBSECTIONS_DATA.id}
		>
			<span>{id}</span>
		</SubSection>
		<SubSection
			className="block__sub-section block__sub-section--height"
			{...BLOCK_SUBSECTIONS_DATA.height}
		>
			<span>{height}</span>
		</SubSection>
		<SubSection
			className="block__sub-section block__sub-section--confirmations"
			{...BLOCK_SUBSECTIONS_DATA.confirmations}
		>
			{confirmations}
		</SubSection>
	</Section>
);

BlockSection.propTypes = {
	className: PropTypes.string,
	confirmations: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired
};

BlockSection.defaultProps = {
	className: null
};

export default memo(BlockSection);
