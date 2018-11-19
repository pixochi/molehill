import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphql, DataProps } from 'react-apollo';
import { reset } from 'redux-form';

import withStateMutation, { IWithStateMutationProps } from 'app/components/higher-order/with-state-mutation';
import { getUserId, getUsername } from 'app/login/selectos';
import { IRootState } from 'app/redux/root-reducer';
import { updateError } from 'app/components/global-event/actions';
import store from 'app/redux/store';
import { s5 } from 'app/components/styleguide/spacing';

import { Base } from 'app/components/styleguide/layout';

import AddCommentForm, { IAddCommentFormProps } from './add-comment-form';
import CommentsList from './comments-list';
import { addCommentMutation, statusComments } from './graphql';
import { StatusComments, StatusCommentsVariables, UserById, AddComment } from 'app/generated/graphql';
import { userById } from 'app/user-profile/graphql';

interface ICommentsProps {
  statusId: string;
}

interface IStateProps {
  userId: string;
  username: string;
}

type Props = IStateProps & IWithStateMutationProps & ICommentsProps & DataProps<UserById>;

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
        <Base paddingHorizontal={s5}>
          <AddCommentForm loading={sMutation.loading} form={this.formName} onSubmit={this.handleAddComment}/>
        </Base>
      </>
    );
  }

  private handleAddComment(values: IAddCommentFormProps) {
    const {
      sMutation,
      userId,
      statusId,
      data,
    } = this.props;

    const newComment = {
      body: values.body,
      userId,
      statusId,
    };

    sMutation.mutate({
      variables: {
        comment: newComment,
      },
      // update locally cached comments data
      update: (store, addCommentResult) => {
        const commentsData = store.readQuery<StatusComments, StatusCommentsVariables>({
          query: statusComments,
          variables: {
            statusId,
          },
        });

        if (commentsData && data.userById) {
          store.writeQuery<StatusComments, StatusCommentsVariables>({
            query: statusComments,
            variables: {
              statusId,
            },
            data: {
              statusComments: {
                comments: [
                  {
                    ...addCommentResult.data.addComment,
                    ...newComment,
                    user: data.userById,
                  },
                  ...commentsData.statusComments.comments,
                ],
               count: commentsData.statusComments.count + 1,
               __typename: 'StatusCommentsWithCount',
              },
            },
          });
        }
      },
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
    username: getUsername(state),
  })),
  graphql<IStateProps & ICommentsProps>(userById, {
    options: (props) => ({
      variables: {
        id: props.userId,
      },
    }),
  }),
  graphql<IStateProps & ICommentsProps, AddComment>(addCommentMutation),
  withStateMutation(),
)(Comments);
