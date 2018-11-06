import React from 'react';
import { WrappedFieldProps } from 'redux-form';

import styled from 'app/components/styleguide';
import { s2 } from '../styleguide/spacing';

import {Body} from 'app/components/styleguide/text';

const IssueMessage = styled(Body)`
  color: ${props => props.theme.error};
`;

const genericFormElement = (WrappedComponent: React.ComponentType) =>
  class extends React.Component<WrappedFieldProps> {
    public render() {
      const {
        input,
        meta: { touched, error, warning },
        ...rest
      } = this.props;

      let issueMessageText: string | undefined;
      issueMessageText = warning && warning;
      issueMessageText = error && error;

      return (
        <>
          <WrappedComponent {...input} {...rest} />
          {touched && <IssueMessage paddingLeft={s2} marginTop={s2}>{issueMessageText}</IssueMessage>}
        </>
      );
    }
};

export default genericFormElement;
