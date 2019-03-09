import React from 'react';
import clns from 'classnames';

import { ControlledForm, Input, Select } from '../../common/Form';
import { stopScroll } from '../../common/eventHandling';

import './_transactionform.scss';

const filterModes = [{ label: 'Type', value: 'type' }];

const filters = {
	type: ['incoming', 'outgoing']
};

export const filterFields = ({ category, name }) => (
	<React.Fragment>
		<Select
			className="transaction-filter-form__filter-category"
			label="Filter By:"
			name={name}
			options={filterModes}
		/>
		{category != null && filters[category] != null && (
			<fieldset name={category}>
				<legend>{`${category} Filter Options: `}</legend>
				{filters[category].map(filterName => (
					<Input
						className="transaction-filter-form__filter-option"
						label={filterName}
						key={filterName}
						name={filterName}
						type="checkbox"
					/>
				))}
			</fieldset>
		)}
	</React.Fragment>
);

const FilterForm = React.forwardRef(
	({ className, ...passthroughProps }, ref) => (
		<ControlledForm
			{...passthroughProps}
			className={clns(
				'transaction-form',
				'transaction-form--filter',
				className
			)}
			forwardedRef={ref}
			id="filter-form"
		>
			{({ isSubmitting, values }) => {
				const name = 'filter';
				const category = values[name];
				return (
					<React.Fragment>
						{filterFields({ name, category })}
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
				);
			}}
		</ControlledForm>
	)
);

export default stopScroll(FilterForm);
