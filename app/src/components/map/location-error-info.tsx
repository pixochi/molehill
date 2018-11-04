import React from 'react';

import { Flex, Base } from '../styleguide/layout';
import { Title } from '../styleguide/text';
import Button from '../button';

import { s4 } from '../styleguide/spacing';

interface ILocationErrorInfoProps {
  infoMessage: string;
  ctaText: string;
  onCtaClick: (...args: any[]) => void;
}

const LocationErrorInfo: React.SFC<ILocationErrorInfoProps> = (props) => {

  const {
    infoMessage,
    ctaText,
    onCtaClick,
  } = props;

  return (
    <Flex direction="column" align="center" padding={s4}>
      <Title textAlign="center">{infoMessage}</Title>
      <Base marginTop={s4}>
        <Button text={ctaText} appearance="info" onClick={onCtaClick}/>
      </Base>
    </Flex>
  );
};

export default LocationErrorInfo;
