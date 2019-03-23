import AddressIcon from '../assets/icons/glyphs/address.svg';
import BlockIcon from '../assets/icons/glyphs/block.svg';
import ConfirmationIcon from '../assets/icons/glyphs/confirmation.svg';
import DateTimeIcon from '../assets/icons/glyphs/date.svg';
import FeeIcon from '../assets/icons/glyphs/currency.svg';
import GasIcon from '../assets/icons/glyphs/gas.svg';
import HashIcon from '../assets/icons/glyphs/hash.svg';
import HeightIcon from '../assets/icons/glyphs/height.svg';
import LimitIcon from '../assets/icons/glyphs/limit.svg';
import PriceIcon from '../assets/icons/glyphs/crypto.svg';
import SourceIcon from '../assets/icons/glyphs/source.svg';
import StatusIcon from '../assets/icons/glyphs/status.svg';
import TotalIcon from '../assets/icons/glyphs/total.svg';
import TypeIcon from '../assets/icons/glyphs/transaction.svg';
import UsageIcon from '../assets/icons/glyphs/usage.svg';

// Labels

export const TRANSACTION_TITLE = 'Transaction Details';

export const TRANSACTION_JUMBOTRON_SUBTITLE = 'Transacted Ether';

export const TRANSACTION_ZERO_ETH_INFO =
  'This is a zero-value data transaction.';

export const TRANSACTION_USE_BACKLINK = true;

// Sections / Sub-sections

export const SOURCE_SECTION_DATA = {
	footer: 'Strict gas limits could fail transactions.',
	icon: SourceIcon,
	title: 'Source Summary'
};

export const SOURCE_SUBSECTIONS_DATA = {
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

export const BLOCK_SECTION_DATA = {
	footer: 'More confirmations, better secured transactions.',
	icon: BlockIcon,
	title: 'Block Data'
};

export const BLOCK_SUBSECTIONS_DATA = {
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

export const GAS_SECTION_DATA = {
	footer: 'Higher gas price increases mining speed.',
	icon: GasIcon,
	title: 'Gas Details'
};

export const GAS_SUBSECTIONS_DATA = {
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
