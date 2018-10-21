import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
`;

const ScreenCenter: React.SFC = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default ScreenCenter;