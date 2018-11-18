import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Flex, Base } from './styleguide/layout';
import { Title, Body } from './styleguide/text';
import PowerOff from './icons/power-off';

import { IRootState } from 'app/redux/root-reducer';
import styled from './styleguide';
import { s2, s4, s5 } from './styleguide/spacing';
import { logOut } from 'app/login/actions';
import { getIsLoggedIn } from './private-route/selectors';
import { getUserId } from 'app/login/selectos';
import { graphql } from 'react-apollo';
import { UserById } from 'app/generated/graphql';
import { userById } from 'app/user-profile/graphql';
import { UserData } from 'app/user-profile/types';
import UserImage from './user-image';

export const NAVBAR_HEIGHT = 50;
export const NAVBAR_HEIGHT_PX = `${NAVBAR_HEIGHT}px`;

const NavbarContainer = styled(Flex)`
  position: fixed;
  right: 0;
  left: 0;
  z-index: 9998;
  height: ${NAVBAR_HEIGHT_PX};
  background: ${props => props.theme.primaryDark};
  box-shadow: 0 2px 4px ${props => props.theme.shadowStrong};
`;

const PowerOffButton = styled(PowerOff).attrs({
  color: (props: any) => props.theme.secondary,
})`
  cursor: pointer;
`;

interface IStateProps {
  isLoggedIn: boolean;
  userId: string;
}

type Props = IStateProps & UserData;

const Navbar: React.SFC<Props> = (props) => {

  const {
    isLoggedIn,
    data,
    userId,
  } = props;

  return (
    <NavbarContainer align="center" justify="space-between" paddingHorizontal={s4}>
      <Link to={isLoggedIn ? '/overview' : '/'}>
        <Title inverted emphasized>Molehill</Title>
      </Link>
      {isLoggedIn && data.userById && (
        <Flex align="center">
          <Link to={`/users/${userId}`}>
            <Flex align="center" marginRight={s5}>
              <Base marginRight={s2}>
              <UserImage imgSrc={data.userById.image} imgSize="32"/>
              </Base>
              <Body inverted>{data.userById.username}</Body>
            </Flex>
          </Link>
          <PowerOffButton onClick={logOut.dispatch} />
        </Flex>
      )}
    </NavbarContainer>
  );
};

export default compose(
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    isLoggedIn: getIsLoggedIn(state),
    userId: getUserId(state),
  })),
  graphql<IStateProps, UserById>(userById, {
    options: (props) => ({
      variables: {
        id: props.userId,
      },
    }),
    skip: (props) => !props.userId || !props.isLoggedIn,
  }),
)(Navbar);
