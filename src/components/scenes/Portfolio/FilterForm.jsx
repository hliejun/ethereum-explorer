import React from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import { ControlledForm, Input, Select } from '../../common/Form';
import { stopScroll } from '../../common/eventHandling';

import { FILTER_CATEGORIES, FILTER_TAGS } from './_constants';

import './_transactionform.scss';

const FILTER_FORM_LABELS = {
	filter: 'Filter By:',
	options: 'Filter Options:',
	reset: 'Reset',
	submit: 'Done'
};

const FilterFields = ({ category, name }) => (
	<React.Fragment>
		<Select
			className="transaction-filter-form__filter-category"
			label={FILTER_FORM_LABELS.filter}
			name={name}
			options={FILTER_CATEGORIES}
		/>
		{category != null && FILTER_TAGS[category] != null && (
			<fieldset name={category}>
				<legend>{`${category} ${FILTER_FORM_LABELS.options} `}</legend>
				{FILTER_TAGS[category].map(tag => (
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
								<span>{FILTER_FORM_LABELS.reset}</span>
							</button>
							<button
								className="transaction-form__button transaction-form__button--main"
								disabled={isSubmitting}
								type="submit"
							>
								<span>{FILTER_FORM_LABELS.submit}</span>
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
