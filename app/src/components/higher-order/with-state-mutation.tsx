import React from 'react';
import { MutationBaseOptions } from 'apollo-client/core/watchQueryOptions';
import { MutationFn } from 'react-apollo';
import { ApolloQueryResult, ApolloError } from 'apollo-client';

const DEFAULT_MUTATION_NAME = 'mutate';

export interface IWithStateMutationProps {
  [mutationName: string]: {
    mutate: MutationFn;
    loading: boolean;
    error: Error | null;
    result: any;
  };
}

// Mutation name can be provided to have multiple stateful
// mutations wrapped around one component
const withStateMutation = ({ name = DEFAULT_MUTATION_NAME } = {}) => (WrappedComponent: React.ComponentType) =>
  class extends React.Component<{mutate: MutationFn}> {
    public state = {
      loading: false,
      error: null,
      result: null,
    };

    public handleMutation(options: MutationBaseOptions) {
      this.setState({
          loading: true,
          error: null,
          result: null,
      });
      return this.props[name](options)
          .then((result: ApolloQueryResult<any>) => {
              this.setState({
                  loading: false,
                  error: null,
                  result,
              });
              return result;
          })
          .catch((err: ApolloError) => {
              this.setState({
                  loading: false,
                  error: err,
                  result: null,
              });
              return err;
          });
    }

    public render() {
      const statefulMutationName = name === DEFAULT_MUTATION_NAME ? 'sMutation' : name;
      const props = {
          ...this.props,
          [statefulMutationName]: {
            mutate: this.handleMutation.bind(this),
            loading: this.state.loading,
            error: this.state.error,
            result: this.state.result,
          },
      };
      return <WrappedComponent {...props}/>;
    }
};

export default withStateMutation;
