import React from 'react';
import { compose } from 'redux';
import { graphql } from 'react-apollo';

import { Title, Body } from 'app/components/styleguide/text';
import { Flex, Base } from 'app/components/styleguide/layout';
import Spinner from 'app/components/spinner';

import { RADIUS } from 'app/constants';
import { s5, s1, s4, s2 } from 'app/components/styleguide/spacing';
import styled from 'app/components/styleguide';

import { statusesInRadius } from './graphql';
import { IStatusResponse, StatusesInRadiusData } from './types';
import ShowMore from 'app/components/show-more';

const StatusItem = styled(Flex)`
  background: ${props => props.theme.invertedText};
  border-bottom: 1px solid ${props => props.theme.border.default};
  `;

const StatusListContainer = styled.div`
  box-shadow: 1px 0 3px ${props => props.theme.border.focus};
`;

interface IStatusListProps {
  userLat?: number;
  userLng?: number;
  className?: string;
}

type Props = StatusesInRadiusData & IStatusListProps;

const StatusList: React.SFC<Props> = (props) => {
  const {
    data,
    className,
  } = props;

  return (
    <StatusListContainer className={className}>
      {!data || data.loading ? (
        <Flex padding={s5} direction="column" align="center" justify="center">
          <Spinner />
          <Body marginTop={s2}>Loading...</Body>
        </Flex>
      ) : (
        data.statusesInRadius && data.statusesInRadius.length ? (
          data.statusesInRadius.map(status => (
            <StatusItem padding={s5} grow={1} key={status.id} direction="column">
              <Title paddingBottom={s1}>{status.title}</Title>
              <Body disabled>{`${status.city} ${status.zipCode}, ${status.street}`}</Body>
              <Base paddingTop={s4}>
                <ShowMore textComponent={Body} text={status.description} />
              </Base>
            </StatusItem>
          ))
        ) : (
          <Body padding={s5} disabled>No statuses found. Be first to share the moment with people near you.</Body>
        )
      )}
    </StatusListContainer>
  );
};

export default compose<React.ComponentType<IStatusListProps>>(
  graphql<IStatusListProps, IStatusResponse[]>(statusesInRadius, {
    options: (props) => ({
      variables: {
        radius: RADIUS,
        latitude: props.userLat,
        longitude: props.userLng,
      },
    }),
    skip: ({userLat, userLng}) => !userLat || !userLng,
  }),
)(StatusList);
