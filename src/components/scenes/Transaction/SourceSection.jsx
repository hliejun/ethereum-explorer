import React from 'react';
import Day from 'dayjs';

import { Section, SubSection } from '../../common/Sections';

import Address from '../../../assets/icons/address.svg';
import DateTime from '../../../assets/icons/date.svg';
import Failed from '../../../assets/icons/error.svg';
import Hash from '../../../assets/icons/hash.svg';
import Pending from '../../../assets/icons/pending.svg';
import Source from '../../../assets/icons/source.svg';
import Status from '../../../assets/icons/status.svg';
import Success from '../../../assets/icons/success.svg';
import Type from '../../../assets/icons/transaction.svg';

const SourceSection = ({ address, className, id, status, timestamp, type }) => {
	const formattedDate = Day(timestamp).format('DD/MM/YY h:mmA');
	const isIncoming = type === 'incoming';
	let StatusIcon;
	switch (status) {
	case 'success':
		StatusIcon = Success;
		break;
	case 'failed':
		StatusIcon = Failed;
		break;
	default:
		StatusIcon = Pending;
	}
	return (
		<Section
			className={className}
			footer="Strict gas limits could fail transactions."
			icon={Source}
			title="Source Summary"
		>
			<SubSection
				className="source__sub-section source__sub-section--id"
				description="Unique transaction identifier"
				icon={Hash}
				title="Transaction Hash"
			>
				<span>{id}</span>
			</SubSection>
			<SubSection
				className="source__sub-section source__sub-section--status"
				description="Mining condition"
				icon={Status}
				title="Status"
			>
				<div className="source__sub-section-status">
					<StatusIcon className="source__sub-section-glyph" />
					<span className="source__sub-section-status-text">{status}</span>
				</div>
			</SubSection>
			<SubSection
				className="source__sub-section source__sub-section--timestamp"
				description="Timestamp (DD/MM/YY H:mm)"
				icon={DateTime}
				title="Date/Time"
			>
				<span>{formattedDate}</span>
			</SubSection>
			<SubSection
				className="source__sub-section source__sub-section--type"
				description={`You are the ${
					isIncoming ? 'receiver' : 'sender'
				} in this transaction`}
				icon={Type}
				title="Type"
			>
				<span className="source__sub-section-value">{type}</span>
			</SubSection>
			<SubSection
				className="source__sub-section source__sub-section--address"
				description={`Ethereum account of the ${
					isIncoming ? 'sender' : 'receiver'
				}`}
				icon={Address}
				title="Address"
			>
				{address}
			</SubSection>
		</Section>
	);
};

export default SourceSection;
