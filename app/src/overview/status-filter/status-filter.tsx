import React from 'react';
import { compose } from 'redux';
import { graphql, DataProps } from 'react-apollo';
import { connect } from 'react-redux';

import { Flex, Base } from 'app/components/styleguide/layout';
import Checkbox from 'app/components/form-elements/checkbox/checkbox';
import Container from 'app/components/container';
import Spinner from 'app/components/spinner';

import { s3, s2 } from 'app/components/styleguide/spacing';
import { IRootState } from 'app/redux/internals';

import RadiusFilter from './radius-filter';
import { allCategories } from '../graphql';
import { AllCategories } from 'app/generated/graphql';
import { getStatusCategories } from '../selectors';
import { IStatusCategory } from '../reducer';
import { changeSelectedCategories } from '../actions';

interface IStateProps {
  selectedCategories: IStatusCategory;
}

type Props = IStateProps & DataProps<AllCategories>;

const StatusFilter: React.SFC<Props> = (props) => {

  const {
    data,
    selectedCategories,
  } = props;

  return (
    <Container direction="column">
      <RadiusFilter />

      {data.loading || !data.allCategories ? (
        <Spinner margined centered />
      ) : (
        <Flex marginTop={s2} justify="space-between" wrap="wrap">
          {data.allCategories.map(category => (
            <Base key={category.name} marginTop={s3}>
              <Checkbox
                id={category.name}
                value={selectedCategories[category.id]}
                label={category.name}
                onClick={() => changeSelectedCategories.dispatch(category.id, !selectedCategories[category.id])}
              />
            </Base>
          ))}
        </Flex>
      )}
    </Container>
  );
};

export default compose<React.ComponentType>(
  graphql(allCategories),
  connect<IStateProps, {}, DataProps<AllCategories>, IRootState>((state) => ({
    selectedCategories: getStatusCategories(state),
  })),
)(StatusFilter);
