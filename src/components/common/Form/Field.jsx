import React, { useContext } from 'react';
import clns from 'classnames';

import { FormContext } from './Form';

import './_field.scss';

const Input = ({ className, label, name, type, value }) => {
	const { formId, onBlur, onChange, values } = useContext(FormContext);
	const inputProps = {
		className: clns(
			'form__field',
			'form__field--input',
			`form__field--${type}`,
			className
		),
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
					checked={values[name]}
					id={id}
					onChange={event => onChange(name)(event.target.checked)}
				/>
				<span className="form__field-themed-check" />
				<span>{label}</span>
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
				<span className="form__field-themed-dot" />
				<span>{label}</span>
			</React.Fragment>
		);
		break;
	default:
		id = `${formId}-input-${name}`;
		view = (
			<React.Fragment>
				<span>{label}</span>
				<input
					{...inputProps}
					onChange={event => onChange(name)(event.target.value)}
					value={values[name]}
				/>
			</React.Fragment>
		);
	}
	return (
		<label
			className={clns(
				'form__field-label',
				'form__field-label--input',
				`form__field-label--${type}`
			)}
			htmlFor={id}
		>
			{view}
		</label>
	);
};

const Select = ({ children, className, label: selectLabel, name, options }) => {
	const { formId, onBlur, onChange, values } = useContext(FormContext);
	return (
		<label
			className="form__field-label form__field-label--select"
			htmlFor={name}
		>
			<span>{selectLabel}</span>
			<select
				className={clns('form__field', 'form__field--select', className)}
				id={`${formId}-select-${name}`}
				name={name}
				onBlur={onBlur(name)}
				onChange={event => onChange(name)(event.target.value)}
				value={values[name]}
			>
				<option
					className="form__field--option"
					disabled
					hidden
					key="placeholder"
					value=""
				>
          Choose your option
				</option>
				{options.map(({ label, value }) => (
					<option className="form__field--option" key={value} value={value}>
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
		className: clns('form__field--message', className),
		message,
		value
	});
};

export { Input, Message, Select };
