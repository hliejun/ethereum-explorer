import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import { FormContext } from './Form';

const ControlledForm = ({
	children,
	className,
	defaultValues,
	forwardedRef,
	id,
	isSubmitting,
	messages,
	onChange: handleChange,
	onMessages: handleMessages,
	onReset: handleReset,
	onSubmit: handleSubmit,
	validate,
	values,
	...passthroughProps
}) => {
	// Provide change handler with updated form and field that changed
	const onChange = fieldName => nextValue => {
		const updatedValues = {
			...values,
			[fieldName]: nextValue
		};
		handleChange(updatedValues, fieldName);
	};

	// Validate and provide validation messages (if any)
	const onBlur = fieldName => () => {
		if (!validate) {
			return;
		}
		const nextMessages = validate(values, fieldName);
		const updatedMessages = {
			...messages,
			...nextMessages
		};
		if (handleMessages) {
			handleMessages(updatedMessages);
		}
	};

	// Request to set data back to defaults
	const onReset = event => {
		event.preventDefault();
		if (handleReset) {
			handleReset(defaultValues);
		}
	};

	// Sanitise form and ensure no errors before requesting submission
	const onSubmit = event => {
		event.preventDefault();
		const currentMessages = { ...messages };
		Object.keys(currentMessages).forEach(
			key => currentMessages[key] == null && delete currentMessages[key]
		);
		if (Object.keys(currentMessages).length === 0 && handleSubmit) {
			handleSubmit(values);
		}
	};

	const formProps = {
		formId: id,
		messages,
		onBlur,
		onChange,
		values
	};

	// Provide form context to functional children
	return (
		<form
			{...passthroughProps}
			className={clns('form', className)}
			onReset={onReset}
			onSubmit={onSubmit}
			ref={forwardedRef}
		>
			<FormContext.Provider value={formProps}>
				{children({ ...formProps, isSubmitting })}
			</FormContext.Provider>
		</form>
	);
};

ControlledForm.propTypes = {
	children: PropTypes.func.isRequired,
	className: PropTypes.string,
	defaultValues: PropTypes.objectOf(PropTypes.any),
	id: PropTypes.string.isRequired,
	isSubmitting: PropTypes.bool,
	messages: PropTypes.objectOf(PropTypes.string),
	onChange: PropTypes.func.isRequired,
	onMessages: PropTypes.func,
	onReset: PropTypes.func,
	onSubmit: PropTypes.func,
	validate: PropTypes.func,
	values: PropTypes.objectOf(PropTypes.any).isRequired
};

ControlledForm.defaultProps = {
	className: null,
	defaultValues: {},
	isSubmitting: false,
	messages: {},
	onMessages: () => {},
	onReset: () => {},
	onSubmit: () => {},
	validate: () => ({})
};

export default memo(ControlledForm);
