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
import { getUsername, getUserId } from 'app/login/selectos';
import ProfileImageDefault from './icons/profile-image-default';

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
  username: string;
  userId: string;
}

const Navbar: React.SFC<IStateProps> = (props) => {

  const {
    isLoggedIn,
    username,
    userId,
  } = props;

  return (
    <NavbarContainer align="center" justify="space-between" paddingHorizontal={s4}>
      <Link to={isLoggedIn ? '/overview' : '/'}>
        <Title inverted emphasized>Molehill</Title>
      </Link>
      {isLoggedIn && (
        <Flex align="center">
          <Link to={`/users/${userId}`}>
            <Flex align="center" marginRight={s5}>
              <Base marginRight={s2}>
                <ProfileImageDefault />
              </Base>
              <Body inverted>{username}</Body>
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
    username: getUsername(state),
    userId: getUserId(state),
  })),
)(Navbar);
