import React from 'react';

import styled from 'app/components/styleguide';

const Container = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  max-width: 380px;
  min-width: 250px;
`;

const ScreenCenter: React.SFC = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
};

export default ScreenCenter;
