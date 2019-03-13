import React, { useContext } from 'react';
import clns from 'classnames';

import { FormContext } from './Form';

import './_field.scss';

const Input = ({ className, label, name, type, value }) => {
	const { formId, onBlur, onChange, values } = useContext(FormContext);
	const inputProps = {
		className: clns('field__input', `field__input--${type}`, className),
		id: name,
		name,
		onBlur: onBlur(name),
		type
	};
	let id;
	let view;
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
				<span className={clns('field__label', `field__label--${type}`)}>
					{label}
				</span>
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
				<span className={clns('field__label', `field__label--${type}`)}>
					{label}
				</span>
			</React.Fragment>
		);
		break;
	default:
		id = `${formId}-input-${name}`;
		view = (
			<React.Fragment>
				<span className={clns('field__label', `field__label--${type}`)}>
					{label}
				</span>
				<input
					{...inputProps}
					onChange={event => onChange(name)(event.target.value)}
					value={values[name]}
				/>
			</React.Fragment>
		);
	}
	return (
		<label className={clns('field', `field--${type}`)} htmlFor={id}>
			{view}
		</label>
	);
};

const Select = ({ children, className, label: selectLabel, name, options }) => {
	const { formId, onBlur, onChange, values } = useContext(FormContext);
	return (
		<label className="field field--select" htmlFor={name}>
			<span className="field__label field__label--select">{selectLabel}</span>
			<select
				className={clns('field__input', 'field__input--select', className)}
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
          Choose your option
				</option>
				{options.map(({ label, value }) => (
					<option className="field__option" key={value} value={value}>
						{label}
					</option>
				))}
				{children}
			</select>
		</label>
	);
};

const Message = ({ className, name, render }) => {
	const { messages, values } = useContext(FormContext);
	const message = messages[name];
	const value = values[name];
	return render({
		className: clns('field--message', className),
		message,
		value
	});
};

export { Input, Message, Select };
