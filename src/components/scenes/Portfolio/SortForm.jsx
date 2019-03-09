import React from 'react';
import clns from 'classnames';

import { ControlledForm, Input, Select } from '../../common/Form';
import { stopScroll } from '../../common/eventHandling';

import './_transactionform.scss';

const sortModes = [
	{ label: 'Date', value: 'date' },
	{ label: 'Amount', value: 'amount' }
];

export const sortFields = ({ category, name }) => (
	<React.Fragment>
		<Select
			className="transaction-sort-form__sort-category"
			label="Sort By:"
			name={name}
			options={sortModes}
		/>
		<fieldset name={category}>
			<legend>{`${category} Sort Order: `}</legend>
			<Input
				className="transaction-filter-form__filter-option"
				label="Ascending"
				name="order"
				type="radio"
				value="ascending"
			/>
			<Input
				className="transaction-filter-form__filter-option"
				label="Descending"
				name="order"
				type="radio"
				value="descending"
			/>
		</fieldset>
	</React.Fragment>
);

const SortForm = React.forwardRef(({ className, ...passthroughProps }, ref) => (
	<ControlledForm
		{...passthroughProps}
		className={clns('transaction-form', 'transaction-form--sort', className)}
		forwardedRef={ref}
		id="sort-form"
	>
		{({ values, isSubmitting }) => (
			<React.Fragment>
				{sortFields({ name: 'sort', category: values.sort })}
				<div className="transaction-form__actions">
					<button className="transaction-form__button" type="reset">
            Reset
					</button>
					<button
						className="transaction-form__button transaction-form__button--main"
						disabled={isSubmitting}
						type="submit"
					>
            Done
					</button>
				</div>
			</React.Fragment>
		)}
	</ControlledForm>
));

export default stopScroll(SortForm);
