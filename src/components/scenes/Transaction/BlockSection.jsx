import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Section, SubSection } from '../../common/Sections';

import { BLOCK_SECTION_DATA, BLOCK_SUBSECTIONS_DATA } from '../../../constants';

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
