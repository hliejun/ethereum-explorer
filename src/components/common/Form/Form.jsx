import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import './_form.scss';

const FormContext = React.createContext({
	messages: {},
	onBlur: null,
	onChange: null,
	values: {}
});

const Form = ({
	children,
	className,
	defaultValues,
	forwardedRef,
	id,
	onChange: handleChange,
	onReset: handleReset,
	onSubmit: handleSubmit,
	validate,
	...passthroughProps
}) => {
	// Form state controls (state is lifted to parent for ControlledForm)
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messages, setMessages] = useState({});
	const [values, setValues] = useState(defaultValues);

	// Provide updated form and field name that changed to subscribed callbacks
	const onChange = fieldName => nextValue => {
		const updatedValues = {
			...values,
			[fieldName]: nextValue
		};
		setValues(updatedValues);
		if (handleChange) {
			handleChange(updatedValues, fieldName);
		}
	};

	// Provide validation messages to subscribers
	const onBlur = fieldName => () => {
		if (!validate) {
			return;
		}
		const nextMessages = validate(values, fieldName);
		const updatedMessages = {
			...messages,
			...nextMessages
		};
		setMessages(updatedMessages);
	};

	// Set values to default on reset, and provide subscribers with default values
	const onReset = event => {
		event.preventDefault();
		setMessages({});
		setIsSubmitting(false);
		setValues(defaultValues);
		if (handleReset) {
			handleReset(defaultValues);
		}
	};

	// Trigger submit action with sanitised form data
	const onSubmit = event => {
		event.preventDefault();
		const currentMessages = { ...messages };
		Object.keys(currentMessages).forEach(
			key => currentMessages[key] == null && delete currentMessages[key]
		);
		if (Object.keys(currentMessages).length === 0 && handleSubmit) {
			handleSubmit(values, { setIsSubmitting, setMessages });
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

Form.propTypes = {
	children: PropTypes.func.isRequired,
	className: PropTypes.string,
	defaultValues: PropTypes.objectOf(PropTypes.any).isRequired,
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onReset: PropTypes.func,
	onSubmit: PropTypes.func,
	validate: PropTypes.func
};

Form.defaultProps = {
	className: null,
	onChange: () => {},
	onReset: () => {},
	onSubmit: () => {},
	validate: () => ({})
};

export { Form, FormContext };
