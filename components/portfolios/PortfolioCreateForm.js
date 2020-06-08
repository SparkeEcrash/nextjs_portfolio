import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert } from 'reactstrap';
import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';

import moment from 'moment';

const validateInputs = (values) => {
	let errors = {};

	//takes the key and value for each pair in the object and stores them in a parent array containing children arrays of length 2 for the key value pair
	const entries = Object.entries(values);

	// takes the keys from the object in 'values' and puts them in an array
	Object.keys(values).forEach(key => {
		if (!values[key] && key !== 'endDate') {
			errors[key] = `Field ${key} is required`
		}
	});

	const startDate = moment(values.startDate);
	const endDate = moment(values.endDate);

	if (startDate && endDate && endDate.isBefore(startDate)) {
		errors.endDate = 'End Date cannot be before start date';
	}

	return errors;
}

const PortfolioCreateForm = ({initialValues, onSubmit, error}) => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
					<Field type="text" name="title" label="Title" component={PortInput}/>
					<Field type="text" name="company" label="Company" component={PortInput}/>
					<Field type="text" name="location" label="Location" component={PortInput}/>
					<Field type="text" name="position" label="Position" component={PortInput}/>
					<Field type="textarea" name="description" label="Description" component={PortInput}/>

					<Field name="startDate" label="Start Date" initialDate={initialValues.startDate} component={PortDate}/>
					<Field name="endDate" label="End Date" initialDate={initialValues.endDate} canBeDisabled={true} component={PortDate}/>

					{
						error && (
							<Alert color="danger">
								{error}
							</Alert>
						)
					}

          <Button color="success" size="lg" type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;

