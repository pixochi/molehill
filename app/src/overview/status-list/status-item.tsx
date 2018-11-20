import React, { RefObject } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { graphql, DataProps } from 'react-apollo';
import { connect } from 'react-redux';

import { Title, Body } from 'app/components/styleguide/text';
import { Flex, Base } from 'app/components/styleguide/layout';
import ShowMore from 'app/components/show-more';
import UserImage from 'app/components/user-image';
import Like from 'app/components/icons/like';

import { s5, s1, s4, s2 } from 'app/components/styleguide/spacing';
import styled, { css } from 'app/components/styleguide';
import {
  StatusesInRadius_statusesInRadius_statuses,
  AddStatusLike,
  AddStatusLikeVariables,
  UserById,
  UserByIdVariables,
  StatusesInRadius,
  StatusesInRadiusVariables,
  RemoveStatusLike,
  RemoveStatusLikeVariables,
} from 'app/generated/graphql';
import withStateMutation, { IWithStateMutationProps } from 'app/components/higher-order/with-state-mutation';
import { IRootState } from 'app/redux/root-reducer';
import { getUserId } from 'app/login/selectos';
import { userById } from 'app/user-profile/graphql';

import Comments from './comments';
import { addStatusLikeMutation, statusesInRadius, removeStatusLikeMutation } from '../graphql';
import { getRadiusInMeters } from '../selectors';
import { getLat, getLng } from '../map/selectors';

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

const LikeIcon = styled(Like).attrs<{isLikedByUser: boolean}>({
  color: (props: any) => props.isLikedByUser ? props.theme.errorLight : props.theme.secondaryDark,
  width: 24,
  height: 24,
})``;

interface IStatusItemProps {
  isSelected: boolean;
  status: StatusesInRadius_statusesInRadius_statuses;
  selectStatus: () => void;
  forwardedRef?: RefObject<any>;
  ref?: RefObject<any> | string;
}

interface IStateProps {
  userId: string;
  radiusInMeters: number;
  userLat?: number;
  userLng?: number;
}

type Props = IStateProps & IStatusItemProps & IWithStateMutationProps<AddStatusLike, AddStatusLikeVariables>
  & IWithStateMutationProps<RemoveStatusLike, RemoveStatusLikeVariables>
  & DataProps<UserById>;

class StatusItem extends React.Component<Props, {canAddLike: boolean}> {

  constructor(props: Props) {
    super(props);
    this.handleAddStatusLike = this.handleAddStatusLike.bind(this);
    this.handleRemoveStatusLike = this.handleRemoveStatusLike.bind(this);
    this.state = {
      canAddLike: !Boolean(props.status.statusLikes.find(like => like.userId === props.userId)),
    };
  }

  public render() {
    const {
      status,
      isSelected,
      forwardedRef,
      selectStatus,
    } = this.props;

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
        <Flex
          isInline
          marginTop={s2}
          align="center"
          clickable
          onClick={this.state.canAddLike ? this.handleAddStatusLike : this.handleRemoveStatusLike}
        >
          <LikeIcon isLikedByUser={!this.state.canAddLike} />
          <Body marginLeft={s2}>{status.statusLikes.length}</Body>
        </Flex>
      </StatusContent>
        <Comments statusId={status.id} />
      </StatusContainer>
    );
  }

  private handleAddStatusLike() {
    const {
      status,
      addStatusLikeMutation,
      data,
      radiusInMeters,
      userLat,
      userLng,
      userId,
    } = this.props;

    this.setState({canAddLike: false}, () => {
      addStatusLikeMutation.mutate({
        variables: {
          like: {
            statusId: status.id,
            userId: data.userById!.id,
          },
        },
        // update locally cached statuses data
        update: (store, addStatusLikeResult) => {
          const statusesData = store.readQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
            query: statusesInRadius,
            variables: {
              radius: radiusInMeters,
              latitude: userLat as number,
              longitude: userLng as number,
              skip: false,
            },
          });

          if (statusesData && addStatusLikeResult.data) {
            const likedStatusIndex = statusesData.statusesInRadius.statuses.findIndex(({id}) => id === status.id);

            if (likedStatusIndex !== -1) {
              const likedStatus = statusesData.statusesInRadius.statuses[likedStatusIndex];
              const updatedLikedStatus = {
                ...likedStatus,
                statusLikes: [
                  ...likedStatus.statusLikes,
                  {
                    ...addStatusLikeResult.data.addStatusLike,
                    userId,
                  },
                ],
              };

              store.writeQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
                query: statusesInRadius,
                variables: {
                  radius: radiusInMeters,
                  latitude: userLat as number,
                  longitude: userLng as number,
                  skip: false,
                },
                data: {
                  statusesInRadius: {
                    ...statusesData.statusesInRadius,
                    statuses: [
                      ...statusesData.statusesInRadius.statuses.slice(0, likedStatusIndex),
                      updatedLikedStatus,
                      ...statusesData.statusesInRadius.statuses.slice(likedStatusIndex + 1),
                    ],
                  },
                },
              });
            }
          }
        },
      });
    });
  }

  private handleRemoveStatusLike() {
    const {
      status,
      removeStatusLikeMutation,
      radiusInMeters,
      userLat,
      userLng,
      userId,
    } = this.props;

    this.setState({canAddLike: true}, () => {
      removeStatusLikeMutation.mutate({
        variables: {
          like: {
            statusId: status.id,
            userId,
          },
        },
        // update locally cached statuses data
        update: (store, removeStatusLikeResult) => {
          const statusesData = store.readQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
            query: statusesInRadius,
            variables: {
              radius: radiusInMeters,
              latitude: userLat as number,
              longitude: userLng as number,
              skip: false,
            },
          });

          if (statusesData && removeStatusLikeResult.data) {
            const dislikedStatusIndex = statusesData.statusesInRadius.statuses.findIndex(({id}) => id === status.id);

            if (dislikedStatusIndex !== -1) {
              const dislikedStatus = statusesData.statusesInRadius.statuses[dislikedStatusIndex];
              const updatedDislikedStatus = {
                ...dislikedStatus,
                statusLikes: dislikedStatus.statusLikes.filter(like => like.userId !== userId),
              };

              store.writeQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
                query: statusesInRadius,
                variables: {
                  radius: radiusInMeters,
                  latitude: userLat as number,
                  longitude: userLng as number,
                  skip: false,
                },
                data: {
                  statusesInRadius: {
                    ...statusesData.statusesInRadius,
                    statuses: [
                      ...statusesData.statusesInRadius.statuses.slice(0, dislikedStatusIndex),
                      updatedDislikedStatus,
                      ...statusesData.statusesInRadius.statuses.slice(dislikedStatusIndex + 1),
                    ],
                  },
                },
              });
            }
          }
        },
      });

    });
  }

}

export default compose<React.ComponentType<IStatusItemProps>>(
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    userId: getUserId(state),
    radiusInMeters: getRadiusInMeters(state),
    userLat: getLat(state),
    userLng: getLng(state),
  })),
  graphql<IStateProps & IStatusItemProps, UserById, UserByIdVariables>(userById, {
    options: (props) => ({
      variables: {
        id: props.userId,
      },
    }),
  }),
  graphql(addStatusLikeMutation, {name: 'addStatusLikeMutation'}),
  withStateMutation({name: 'addStatusLikeMutation'}),
  graphql(removeStatusLikeMutation, {name: 'removeStatusLikeMutation'}),
  withStateMutation({name: 'removeStatusLikeMutation'}),
)(React.forwardRef((props: any, ref: RefObject<any>) => {
  return <StatusItem {...props} forwardedRef={ref} />;
}));
