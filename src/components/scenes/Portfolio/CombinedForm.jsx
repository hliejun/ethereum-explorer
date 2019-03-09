import React from 'react';
import clns from 'classnames';

import { ControlledForm } from '../../common/Form';
import { filterFields } from './FilterForm';
import { sortFields } from './SortForm';

import './_transactionform.scss';

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
							{filterFields({ category: values.filter, name: 'filter' })}
						</div>
						<div className="transaction-form__section">
							{sortFields({ category: values.sort, name: 'sort' })}
						</div>
					</div>
					<div className="transaction-form__actions">
						<button className="transaction-form__button" type="reset">
              Reset
						</button>
					</div>
				</React.Fragment>
			)}
		</ControlledForm>
	)
);

export default CombinedForm;
