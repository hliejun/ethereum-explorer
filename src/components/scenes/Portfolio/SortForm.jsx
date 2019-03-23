import React from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import { ControlledForm, Input, Select } from '../../common/Form';
import { stopScroll } from '../../common/eventHandling';

import { SORT_CATEGORIES, SORT_FORM_LABELS } from '../../../constants';

import './_transactionform.scss';

const SortFields = ({ category, name }) => (
	<React.Fragment>
		<Select
			className="transaction-sort-form__sort-category"
			label={SORT_FORM_LABELS.sort}
			name={name}
			options={SORT_CATEGORIES}
		/>
		<fieldset name={category}>
			<legend>{`${category} Sort Order: `}</legend>
			<Input
				className="transaction-filter-form__filter-option"
				label={SORT_FORM_LABELS.ascending}
				name="order"
				type="radio"
				value="ascending"
			/>
			<Input
				className="transaction-filter-form__filter-option"
				label={SORT_FORM_LABELS.descending}
				name="order"
				type="radio"
				value="descending"
			/>
		</fieldset>
	</React.Fragment>
);

SortFields.propTypes = {
	category: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

const SortForm = React.forwardRef(({ className, ...passthroughProps }, ref) => (
	<ControlledForm
		{...passthroughProps}
		className={clns('transaction-form', 'transaction-form--sort', className)}
		forwardedRef={ref}
		id="sort-form"
	>
		{({ isSubmitting, values }) => (
			<React.Fragment>
				<SortFields category={values.sort} name="sort" />
				<div className="transaction-form__actions">
					<button className="transaction-form__button" type="reset">
						<span>{SORT_FORM_LABELS.reset}</span>
					</button>
					<button
						className="transaction-form__button transaction-form__button--main"
						disabled={isSubmitting}
						type="submit"
					>
						<span>{SORT_FORM_LABELS.submit}</span>
					</button>
				</div>
			</React.Fragment>
		)}
	</ControlledForm>
));

SortForm.propTypes = {
	className: PropTypes.string
};

SortForm.defaultProps = {
	className: null
};

export { SortFields };
export default stopScroll(SortForm);
