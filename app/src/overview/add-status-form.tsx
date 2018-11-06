import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form, InjectedFormProps, reduxForm, formValueSelector } from 'redux-form';

import Button from 'app/components/button';
import FormField from 'app/components/form-elements/form-field';
import FormInput from 'app/components/form-elements/form-input';
import FormTextArea from 'app/components/form-elements/form-text-area';
import FormCheckbox from 'app/components/form-elements/checkbox/form-checkbox';

import { IFormProps } from 'app/components/form-elements/typings';
import { IRootState } from 'app/redux/root-reducer';

export interface IFormData {
  title: string;
  description: string;
  useCurrentLocation?: boolean;
  country?: string;
  city?: string;
  zipCode?: string;
  street?: string;
}

interface IStateProps {
  useCurrentLocation: boolean;
}

type Props = IStateProps & InjectedFormProps<IFormData> & IFormProps;

class AddStatusForm extends React.PureComponent<Props> {
  public render() {
    const {
      handleSubmit,
      loading,
      useCurrentLocation,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
          <FormField required name="title" component={FormInput} placeholder="Title" />
          <FormField name="description" component={FormTextArea} placeholder="Description" />
          <FormField
            id="useCurrentLocation"
            name="useCurrentLocation"
            label="Use current location"
            component={FormCheckbox}
          />
          {!useCurrentLocation && (
            <>
              <FormField name="country" component={FormInput} placeholder="Country" />
              <FormField name="city" component={FormInput} placeholder="City" />
              <FormField name="zipCode" component={FormInput} placeholder="ZIP Code" />
              <FormField name="street" component={FormInput} placeholder="Street" />
            </>
          )}
          <Button loading={loading} text="+ Add" type="submit" appearance="submit" fullWidth={true} />
      </Form>
    );
  }
}

const FORM_NAME = 'ADD_STATUS_FORM';
const formSelector = formValueSelector(FORM_NAME);

export default compose<React.ComponentType<IFormProps>>(
  reduxForm({
    form: FORM_NAME,
  }),
  connect<IStateProps>((state: IRootState) => ({
    useCurrentLocation: formSelector(state, 'useCurrentLocation'),
  })),
)(AddStatusForm);
