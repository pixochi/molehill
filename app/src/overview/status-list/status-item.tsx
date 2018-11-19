import React, { RefObject } from 'react';
import { Link } from 'react-router-dom';

import { Title, Body } from 'app/components/styleguide/text';
import { Flex, Base } from 'app/components/styleguide/layout';
import ShowMore from 'app/components/show-more';
import UserImage from 'app/components/user-image';

import { s5, s1, s4, s2 } from 'app/components/styleguide/spacing';
import styled, { css } from 'app/components/styleguide';
import { StatusesInRadius_statusesInRadius } from 'app/generated/graphql';

import Comments from './comments';

const GOOGLE_MAPS_API = 'https://www.google.com/maps/dir/?api=1&';

const buildNavigationLink = (coordinates: number[]) => {
  return `${GOOGLE_MAPS_API}destination=${coordinates[0]},${coordinates[1]}`;
};

const StatusContainer = styled(Flex)<{selected?: boolean}>`
  background: ${props => props.theme.invertedText};
  border-bottom: 1px solid ${props => props.theme.border.default};

  ${props => props.selected && css`
    border-left: 14px solid ${props => props.theme.primary};
    box-shadow: 2px 2px 4px ${props => props.theme.shadow};
    transform: translateZ(1px)
  `}
`;

const StatusContent = styled(Base)`
  border-bottom: 1px solid ${props => props.theme.border.default};
`;

interface IStatusItemProps {
  isSelected: boolean;
  status: StatusesInRadius_statusesInRadius;
  selectStatus: () => void;
  forwardedRef?: RefObject<any>;
}

type Props = IStatusItemProps;

const StatusItem: React.SFC<Props> = (props) => {
  const {
    status,
    isSelected,
    forwardedRef,
    selectStatus,
  } = props;

  return (
    <StatusContainer
      paddingVertical={s5}
      grow={1}
      key={status.id}
      direction="column"
      selected={isSelected}
      ref={forwardedRef}
    >
    <StatusContent paddingBottom={s2} paddingHorizontal={s5}>
      <Title
        clickable
        paddingBottom={s1}
        onClick={selectStatus}
      >
        {status.title}
      </Title>
      <a
        target="_blank"
        href={buildNavigationLink(status.location.coordinates)}
      >
        <Body disabled>{`${status.city} ${status.zipCode}, ${status.street}`}</Body>
      </a>
      <Link to={`/users/${status.user.id}`}>
        <Flex align="center" marginTop={s2}>
          <UserImage imgSrc={status.user.image} />
          <Body marginLeft={s2} marginTop={s1}>@{`${status.user.username}`}</Body>
        </Flex>
      </Link>
      {Boolean(status.description) && (
        <Base paddingTop={s4}>
          <ShowMore textComponent={Body} text={status.description} />
        </Base>
      )}
    </StatusContent>
      <Comments statusId={status.id} />
    </StatusContainer>
  );
};

export default React.forwardRef((props: IStatusItemProps, ref: RefObject<any>) => {
  return <StatusItem {...props} forwardedRef={ref} />;
});
