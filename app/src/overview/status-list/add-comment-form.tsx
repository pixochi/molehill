import React from 'react';
import { Form, InjectedFormProps, reduxForm } from 'redux-form';
import { compose } from 'redux';

import { IFormProps } from 'app/components/form-elements/typings';

import FormField from 'app/components/form-elements/form-field';
import Button from 'app/components/button';
import FormTextArea from 'app/components/form-elements/form-text-area';

export interface IAddCommentFormProps {
  body: string;
}

type Props = Partial<InjectedFormProps<IAddCommentFormProps>> & IFormProps;

class AddCommentForm extends React.PureComponent<Props> {
  public render() {
    const {
      handleSubmit,
      loading,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
          <FormField name="body" rows="2" placeholder="Write a comment..." component={FormTextArea} />
          <Button
            loading={loading}
            text="Comment"
            type="submit"
            appearance="submit"
            alignWith="right"
            buttonSize="mini"
          />
      </Form>
    );
  }
}

export default compose<React.ComponentType<Props>>(
  // name of the form is passed as an attribute(form)
  // because multiple comment forms are rendered on the same page
  reduxForm({}),
)(AddCommentForm);
