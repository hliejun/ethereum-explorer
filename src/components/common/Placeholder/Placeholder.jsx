import React from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import Loader from '../Loader';

import './_placeholder.scss';

const Placeholder = ({
	className,
	description,
	emptyIcon: EmptyIcon,
	errorIcon: ErrorIcon,
	hasError,
	isEmpty,
	isLoading,
	onRefresh,
	refreshText,
	title
}) => {
	return (
		<div className={clns('placeholder', className)}>
			{!isLoading && isEmpty && EmptyIcon && (
				<EmptyIcon className="placeholder__glyph placeholder__glyph--empty" />
			)}
			{!isLoading && hasError && ErrorIcon && (
				<ErrorIcon className="placeholder__glyph placeholder__glyph--error" />
			)}
			{isLoading && (
				<Loader className="placeholder__loader" isLoading={isLoading} />
			)}
			<div className="placeholder__text">
				{title && <span className="placeholder__title">{title}</span>}
				{description && (
					<span className="placeholder__description">{description}</span>
				)}
			</div>
			{!isLoading && onRefresh && (
				<button
					className="placeholder__refresh"
					onClick={onRefresh}
					type="button"
				>
					{refreshText}
				</button>
			)}
		</div>
	);
};

Placeholder.propTypes = {
	className: PropTypes.string,
	description: PropTypes.string,
	emptyIcon: PropTypes.elementType,
	errorIcon: PropTypes.elementType,
	hasError: PropTypes.bool,
	isEmpty: PropTypes.bool,
	isLoading: PropTypes.bool,
	onRefresh: PropTypes.func,
	refreshText: PropTypes.string,
	title: PropTypes.string
};

Placeholder.defaultProps = {
	className: null,
	description: null,
	emptyIcon: null,
	errorIcon: null,
	hasError: false,
	isEmpty: false,
	isLoading: false,
	onRefresh: null,
	refreshText: 'Try Again',
	title: null
};

export default Placeholder;
