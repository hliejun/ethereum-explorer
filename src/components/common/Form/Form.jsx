import React, { useState } from 'react';
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
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messages, setMessages] = useState({});
	const [values, setValues] = useState(defaultValues);

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

	const onReset = event => {
		event.preventDefault();
		setMessages({});
		setIsSubmitting(false);
		setValues(defaultValues);
		if (handleReset) {
			handleReset(defaultValues);
		}
	};

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

export { Form, FormContext };
