import React from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import { ControlledForm } from '../../common/Form';
import { FilterFields } from './FilterForm';
import { SortFields } from './SortForm';

import './_transactionform.scss';

const CONTROL_FORM_LABELS = {
	reset: 'Reset'
};

const CombinedForm = React.forwardRef(
	({ className, ...passthroughProps }, ref) => (
		<ControlledForm
			{...passthroughProps}
			className={clns(
				'transaction-form',
				'transaction-form--combined',
				className
			)}
			forwardedRef={ref}
			id="combined-form"
		>
			{({ values }) => (
				<React.Fragment>
					<div className="transaction-form__content">
						<div className="transaction-form__section">
							<FilterFields category={values.filter} name="filter" />
						</div>
						<div className="transaction-form__section">
							<SortFields category={values.sort} name="sort" />
						</div>
					</div>
					<div className="transaction-form__actions">
						<button className="transaction-form__button" type="reset">
							<span>{CONTROL_FORM_LABELS.reset}</span>
						</button>
					</div>
				</React.Fragment>
			)}
		</ControlledForm>
	)
);

CombinedForm.propTypes = {
	className: PropTypes.string,
	defaultValues: PropTypes.shape({
		filter: PropTypes.oneOf(['type']),
		incoming: PropTypes.oneOf(['true', true, 'false', false]),
		order: PropTypes.oneOf(['ascending', 'descending']),
		outgoing: PropTypes.oneOf(['true', true, 'false', false]),
		sort: PropTypes.oneOf(['date', 'amount'])
	}).isRequired,
	isSubmitting: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	onReset: PropTypes.func.isRequired,
	values: PropTypes.shape({
		filter: PropTypes.oneOf(['type']),
		incoming: PropTypes.oneOf(['true', true, 'false', false]),
		order: PropTypes.oneOf(['ascending', 'descending']),
		outgoing: PropTypes.oneOf(['true', true, 'false', false]),
		sort: PropTypes.oneOf(['date', 'amount'])
	}).isRequired
};

CombinedForm.defaultProps = {
	className: null,
	isSubmitting: false
};

export default CombinedForm;
