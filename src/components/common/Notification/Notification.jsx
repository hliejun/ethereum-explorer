import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import Modal from '../Modal';

import './_notification.scss';

const Notification = ({
	className,
	description,
	dismissText,
	onDismiss,
	subtitle,
	title
}) => (
	<button className="notification__portal" onClick={onDismiss} type="button">
		<Modal>
			<div className={clns('notification', className)}>
				<div className="notification__header">
					<span className="notification__title">{title}</span>
					{subtitle && (
						<span className="notification__subtitle">{subtitle}</span>
					)}
				</div>
				{description && (
					<span className="notification__description">{description}</span>
				)}
				<button className="notification__confirmation" type="button">
					<span>{dismissText}</span>
				</button>
			</div>
		</Modal>
	</button>
);

Notification.propTypes = {
	className: PropTypes.string,
	description: PropTypes.string,
	dismissText: PropTypes.string,
	onDismiss: PropTypes.func,
	subtitle: PropTypes.string,
	title: PropTypes.string
};

Notification.defaultProps = {
	className: null,
	description: null,
	dismissText: 'Okay',
	onDismiss: () => {},
	subtitle: null,
	title: 'Notification'
};

export default memo(Notification);
