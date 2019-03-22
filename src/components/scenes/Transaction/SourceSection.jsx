import React, { memo } from 'react';
import Day from 'dayjs';
import PropTypes from 'prop-types';
import clns from 'classnames';

import { Section, SubSection } from '../../common/Sections';

import AddressIcon from '../../../assets/icons/glyphs/address.svg';
import DateTimeIcon from '../../../assets/icons/glyphs/date.svg';
import FailedIcon from '../../../assets/icons/glyphs/error.svg';
import HashIcon from '../../../assets/icons/glyphs/hash.svg';
import PendingIcon from '../../../assets/icons/glyphs/pending.svg';
import SourceIcon from '../../../assets/icons/glyphs/source.svg';
import StatusIcon from '../../../assets/icons/glyphs/status.svg';
import SuccessIcon from '../../../assets/icons/glyphs/success.svg';
import TypeIcon from '../../../assets/icons/glyphs/transaction.svg';

const SOURCE_SECTION_DATA = {
	footer: 'Strict gas limits could fail transactions.',
	icon: SourceIcon,
	title: 'Source Summary'
};

const SOURCE_SUBSECTIONS_DATA = {
	address: {
		description: 'Ethereum account of the receiver/sender',
		icon: AddressIcon,
		title: 'Address'
	},
	id: {
		description: 'Unique transaction identifier',
		icon: HashIcon,
		title: 'Transaction Hash'
	},
	status: {
		description: 'Mining condition',
		icon: StatusIcon,
		title: 'Status'
	},
	timestamp: {
		description: 'Timestamp (DD/MM/YY H:mm)',
		icon: DateTimeIcon,
		title: 'Date/Time'
	},
	type: {
		description: 'Whether the transaction is incoming/outgoing',
		icon: TypeIcon,
		title: 'Type'
	}
};

const DATE_FORMAT = 'DD/MM/YY h:mmA';

const SourceSection = ({ address, className, id, status, timestamp, type }) => {
	// Format Linux/epoch time
	const formattedDate = Day(parseInt(timestamp, 10) * 1000).format(DATE_FORMAT);

	// Set status tag icon
	const isIncoming = type === 'incoming';
	let StatusGlyph;
	switch (status) {
	case 'success':
		StatusGlyph = SuccessIcon;
		break;
	case 'failed':
		StatusGlyph = FailedIcon;
		break;
	default:
		StatusGlyph = PendingIcon;
	}

	return (
		<Section className={className} {...SOURCE_SECTION_DATA}>
			<SubSection
				className="source__sub-section source__sub-section--id"
				{...SOURCE_SUBSECTIONS_DATA.id}
			>
				<span>{id}</span>
			</SubSection>
			<SubSection
				className="source__sub-section source__sub-section--status"
				{...SOURCE_SUBSECTIONS_DATA.status}
			>
				<div
					className={clns(
						'source__sub-section-status',
						`source__sub-section-status--${status}`
					)}
				>
					<StatusGlyph className="source__sub-section-glyph" />
					<span className="source__sub-section-status-text">{status}</span>
				</div>
			</SubSection>
			<SubSection
				className="source__sub-section source__sub-section--timestamp"
				{...SOURCE_SUBSECTIONS_DATA.timestamp}
			>
				<span>{formattedDate}</span>
			</SubSection>
			<SubSection
				className="source__sub-section source__sub-section--type"
				{...SOURCE_SUBSECTIONS_DATA.type}
				description={`You are the ${
					isIncoming ? 'receiver' : 'sender'
				} in this transaction`}
			>
				<span className="source__sub-section-type">{type}</span>
			</SubSection>
			<SubSection
				className="source__sub-section source__sub-section--address"
				{...SOURCE_SUBSECTIONS_DATA.address}
				description={`Ethereum account of the ${
					isIncoming ? 'sender' : 'receiver'
				}`}
			>
				{address}
			</SubSection>
		</Section>
	);
};

SourceSection.propTypes = {
	address: PropTypes.string.isRequired,
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	status: PropTypes.oneOf(['failed', 'pending', 'success']).isRequired,
	timestamp: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired
};

SourceSection.defaultProps = {
	className: null
};

export default memo(SourceSection);
