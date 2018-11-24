import React from 'react';
import { Form, InjectedFormProps, reduxForm } from 'redux-form';
import { compose } from 'redux';

import { IFormProps } from 'app/components/form-elements/typings';

import FormField from 'app/components/form-elements/form-field';
import FormTextArea from 'app/components/form-elements/form-text-area';

export interface IEditCommentFormProps {
  body: string;
}

type Props = Partial<InjectedFormProps<IEditCommentFormProps>> & IFormProps;

class EditCommentForm extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  public render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
          <FormField name="body" rows="2" component={FormTextArea} onKeyDown={this.handleKeyDown}/>
      </Form>
    );
  }

  private handleKeyDown(e: React.KeyboardEvent<any>) {
    const {
      onSubmit,
    } = this.props;

    if (onSubmit && e.keyCode === 13) {
       e.preventDefault();
       (onSubmit as any)({
        body: (e.target as any).value,
      });
    }

  }
}

export default compose<React.ComponentType<Props>>(
  reduxForm({
    form: 'EDIT_COMMENT_FORM',
    initialValues: (props: Props) => ({
      body: props.initialValues && props.initialValues.body,
    }),
  }),
)(EditCommentForm);
