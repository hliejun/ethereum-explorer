import React from 'react';
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
	const onChange = fieldName => nextValue => {
		const updatedValues = {
			...values,
			[fieldName]: nextValue
		};
		handleChange(updatedValues, fieldName);
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
		if (handleMessages) {
			handleMessages(updatedMessages);
		}
	};

	const onReset = event => {
		event.preventDefault();
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

export default ControlledForm;
