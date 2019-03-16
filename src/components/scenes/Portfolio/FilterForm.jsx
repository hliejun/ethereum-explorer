import React from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import { ControlledForm, Input, Select } from '../../common/Form';
import { filterCategories, filterTags } from './_constants';
import { stopScroll } from '../../common/eventHandling';

import './_transactionform.scss';

const FilterFields = ({ category, name }) => (
	<React.Fragment>
		<Select
			className="transaction-filter-form__filter-category"
			label="Filter By:"
			name={name}
			options={filterCategories}
		/>
		{category != null && filterTags[category] != null && (
			<fieldset name={category}>
				<legend>{`${category} Filter Options: `}</legend>
				{filterTags[category].map(tag => (
					<Input
						className="transaction-filter-form__filter-option"
						label={tag}
						key={tag}
						name={tag}
						type="checkbox"
					/>
				))}
			</fieldset>
		)}
	</React.Fragment>
);

FilterFields.propTypes = {
	category: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

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
						<FilterFields category={category} name={name} />
						<div className="transaction-form__actions">
							<button className="transaction-form__button" type="reset">
								<span>Reset</span>
							</button>
							<button
								className="transaction-form__button transaction-form__button--main"
								disabled={isSubmitting}
								type="submit"
							>
								<span>Done</span>
							</button>
						</div>
					</React.Fragment>
				);
			}}
		</ControlledForm>
	)
);

FilterForm.propTypes = {
	className: PropTypes.string
};

FilterForm.defaultProps = {
	className: null
};

export { FilterFields };
export default stopScroll(FilterForm);
