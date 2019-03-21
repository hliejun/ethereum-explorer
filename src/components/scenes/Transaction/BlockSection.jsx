import React from 'react';
import PropTypes from 'prop-types';

import { Section, SubSection } from '../../common/Sections';

import Block from '../../../assets/icons/glyphs/block.svg';
import Confirmation from '../../../assets/icons/glyphs/confirmation.svg';
import Hash from '../../../assets/icons/glyphs/hash.svg';
import Height from '../../../assets/icons/glyphs/height.svg';

const BlockSection = ({ className, confirmations, height, id }) => (
	<Section
		className={className}
		footer="More confirmations, better secured transactions."
		icon={Block}
		title="Block Data"
	>
		<SubSection
			className="block__sub-section block__sub-section--id"
			description="Unique block identifier"
			icon={Hash}
			title="Block Hash"
		>
			<span>{id}</span>
		</SubSection>
		<SubSection
			className="block__sub-section block__sub-section--height"
			description="Number of blocks from genesis block"
			icon={Height}
			title="Number/Height"
		>
			<span>{height}</span>
		</SubSection>
		<SubSection
			className="block__sub-section block__sub-section--confirmations"
			description="Number of blocks burying this transaction"
			icon={Confirmation}
			title="Confirmations"
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

export default BlockSection;
