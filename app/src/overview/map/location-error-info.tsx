import React from 'react';

import { Flex, Base } from 'app/components/styleguide/layout';
import { Body } from 'app/components/styleguide/text';
import Button from 'app/components/button';

import { s4 } from 'app/components/styleguide/spacing';

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
      <Body textAlign="center">{infoMessage}</Body>
      <Base marginTop={s4}>
        <Button text={ctaText} appearance="info" onClick={onCtaClick}/>
      </Base>
    </Flex>
  );
};

export default LocationErrorInfo;
