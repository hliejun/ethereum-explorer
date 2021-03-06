import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import { FormContext } from './Form';

import { SELECT_PLACEHOLDER } from '../../../constants';

import './_field.scss';

const Input = ({
	className,
	disabled,
	label,
	name,
	type,
	value,
	...passthroughProps
}) => {
	// Receive form controls and state using context
	const { formId, onBlur, onChange, values } = useContext(FormContext);
	const inputProps = {
		...passthroughProps,
		className: clns('field__input', `field__input--${type}`),
		disabled,
		id: name,
		name,
		onBlur: onBlur(name),
		type
	};

	let id;
	let view;

	// Handle different input types as an input/field factory
	// Also to enable input theming
	switch (type) {
	case 'checkbox':
		id = `${formId}-checkbox-${name}`;
		view = (
			<React.Fragment>
				<input
					{...inputProps}
					checked={String(values[name]) === 'true'}
					id={id}
					onChange={event => onChange(name)(event.target.checked)}
				/>
				<span
					aria-checked={String(values[name]) === 'true'}
					className="field__input-check"
					onKeyPress={event => {
						if (event.charCode === 13 || event.charCode === 32) {
							onChange(name)(String(values[name]) === 'false');
						}
					}}
					role="checkbox"
					tabIndex="0"
				/>
				{label && (
					<span className={clns('field__label', `field__label--${type}`)}>
						{label}
					</span>
				)}
			</React.Fragment>
		);
		break;
	case 'radio':
		id = `${formId}-radio-${name}-${value}`;
		view = (
			<React.Fragment>
				<input
					{...inputProps}
					checked={values[name] === value}
					id={id}
					onChange={event => onChange(name)(event.target.value)}
					value={value}
				/>
				<span
					aria-checked={values[name] === value}
					className="field__input-dot"
					onKeyPress={event => {
						if (event.charCode === 13 || event.charCode === 32) {
							onChange(name)(value);
						}
					}}
					role="radio"
					tabIndex="0"
				/>
				{label && (
					<span className={clns('field__label', `field__label--${type}`)}>
						{label}
					</span>
				)}
			</React.Fragment>
		);
		break;
	case 'toggle':
		id = `${formId}-toggle-${name}`;
		view = (
			<React.Fragment>
				{label && (
					<span className={clns('field__label', `field__label--${type}`)}>
						{label}
					</span>
				)}
				<div className="field__container">
					<input
						{...inputProps}
						checked={String(values[name]) === 'true'}
						id={id}
						onChange={event => onChange(name)(event.target.checked)}
						type="checkbox"
					/>
					<span
						aria-checked={String(values[name]) === 'true'}
						className="field__input-switch"
						onKeyPress={event => {
							if (event.charCode === 13 || event.charCode === 32) {
								onChange(name)(String(values[name]) === 'false');
							}
						}}
						role="checkbox"
						tabIndex="0"
					/>
				</div>
			</React.Fragment>
		);
		break;
	case 'textarea':
		id = `${formId}-textarea-${name}`;
		view = (
			<React.Fragment>
				{label && (
					<span className={clns('field__label', `field__label--${type}`)}>
						{label}
					</span>
				)}
				<textarea
					{...inputProps}
					form={formId}
					id={id}
					onChange={event => onChange(name)(event.target.value)}
					value={values[name]}
				/>
			</React.Fragment>
		);
		break;
	default:
		id = `${formId}-input-${name}`;
		view = (
			<React.Fragment>
				{label && (
					<span className={clns('field__label', `field__label--${type}`)}>
						{label}
					</span>
				)}
				<input
					{...inputProps}
					id={id}
					onChange={event => onChange(name)(event.target.value)}
					value={values[name]}
				/>
			</React.Fragment>
		);
	}

	return (
		<label className={clns('field', `field--${type}`, className)} htmlFor={id}>
			{view}
		</label>
	);
};

Input.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf([
		'button',
		'checkbox',
		'color',
		'date',
		'datetime-local',
		'email',
		'file',
		'hidden',
		'image',
		'month',
		'number',
		'password',
		'radio',
		'range',
		'reset',
		'search',
		'submit',
		'tel',
		'text',
		'textarea',
		'time',
		'toggle',
		'url',
		'week'
	]).isRequired,
	value: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string
	])
};

Input.defaultProps = {
	className: null,
	label: null,
	value: null
};

const Select = ({
	children,
	className,
	disabled,
	label: selectLabel,
	name,
	options
}) => {
	// Receive form controls and state using context
	const { formId, onBlur, onChange, values } = useContext(FormContext);

	// Automatically generate select options based on options list
	return (
		<label className="field field--select" htmlFor={name}>
			{selectLabel && (
				<span className="field__label field__label--select">{selectLabel}</span>
			)}
			<select
				className={clns('field__input', 'field__input--select', className)}
				disabled={disabled}
				id={`${formId}-select-${name}`}
				name={name}
				onBlur={onBlur(name)}
				onChange={event => onChange(name)(event.target.value)}
				value={values[name]}
			>
				<option
					className="field__option"
					disabled
					hidden
					key="placeholder"
					value=""
				>
					{SELECT_PLACEHOLDER}
				</option>
				{options &&
          options.map(({ label, value }) => (
          	<option className="field__option" key={value} value={value}>
          		{label}
          	</option>
          ))}
				{children}
			</select>
		</label>
	);
};

Select.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired
		})
	)
};

Select.defaultProps = {
	children: null,
	className: null,
	label: null,
	options: []
};

const Message = ({ className, name, render }) => {
	// Receive form controls and state using context
	const { messages, values } = useContext(FormContext);

	// Read validation messages from form context
	const message = messages[name];
	const value = values[name];

	// Use render props to render message with form context
	return render({
		className: clns('field--message', className),
		message,
		value
	});
};

Message.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	render: PropTypes.func.isRequired
};

Message.defaultProps = {
	className: null
};

export { Input, Message, Select };
