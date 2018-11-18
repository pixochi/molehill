import React from 'react';
import { Form, reduxForm, InjectedFormProps } from 'redux-form';
import { compose } from 'redux';

import { IFormProps } from 'app/components/form-elements/typings';

import FormField from 'app/components/form-elements/form-field';
import Button from 'app/components/button';
import FormTextArea from 'app/components/form-elements/form-text-area';

export interface IEditProfileFormProps {
  bio: string;
}

type EditUserProfileProps = InjectedFormProps<IEditProfileFormProps> & IFormProps;

class EditUserProfile extends React.PureComponent<EditUserProfileProps> {
  public render() {
    const {
      handleSubmit,
      loading,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
          <FormField name="bio" component={FormTextArea} placeholder="..." />
          <Button loading={loading} text="Update" type="submit" appearance="submit" fullWidth />
      </Form>
    );
  }
}

export default compose<React.ComponentType<IFormProps>>(
  reduxForm({
    form: 'EditUserProfile',
  }),
)(EditUserProfile);
