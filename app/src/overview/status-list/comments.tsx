import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { reset } from 'redux-form';

import withStateMutation, { IWithStateMutationProps } from 'app/components/higher-order/with-state-mutation';
import { getUserId } from 'app/login/selectos';
import { IRootState } from 'app/redux/root-reducer';
import { updateError } from 'app/components/global-event/actions';
import store from 'app/redux/store';

import AddCommentForm, { IAddCommentFormProps } from './add-comment-form';
import CommentsList from './comments-list';
import { addCommentMutation, statusComments } from './graphql';

interface ICommentsProps {
  statusId: string;
}

interface IStateProps {
  userId: string;
}

type Props = IWithStateMutationProps & ICommentsProps;

class Comments extends React.PureComponent<Props> {

  private formName: string;

  constructor(props: Props) {
    super(props);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.formName = `status-${props.statusId}`;
  }

  public render() {
    const {
      sMutation,
      statusId,
    } = this.props;

    return (
      <>
        <CommentsList statusId={statusId} />
        <AddCommentForm loading={sMutation.loading} form={this.formName} onSubmit={this.handleAddComment}/>
      </>
    );
  }

  private handleAddComment(values: IAddCommentFormProps) {
    const {
      sMutation,
      userId,
      statusId,
    } = this.props;

    sMutation.mutate({
      variables: {
        comment: {
          body: values.body,
          userId,
          statusId,
        },
      },
      refetchQueries: [{
        query: statusComments,
        variables: {
          statusId,
        },
      }],
    })
    .then(() => {
      store.dispatch(reset(this.formName));
    })
    .catch(e => updateError.dispatch('Failed to add a comment'));

  }
}

export default compose(
  connect<IStateProps, {}, ICommentsProps, IRootState>((state) => ({
    userId: getUserId(state),
  })),
  graphql(addCommentMutation),
  withStateMutation(),
)(Comments);
