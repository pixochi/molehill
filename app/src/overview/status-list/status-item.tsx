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
import PersonIcon from 'app/components/icons/person';
import MenuButton, { IMenuOption } from 'app/components/menu-button';
import Button from 'app/components/button';

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
import { formatCreatedAt } from 'app/helpers/time';
import { openModal } from 'app/redux/internals';
import { ModalIds } from 'app/components/modal/constants';

import Comments from './comments';
import { addStatusLikeMutation, statusesInRadius, removeStatusLikeMutation } from '../graphql';
import { getRadiusInMeters } from '../selectors';
import { getLat, getLng } from '../map/selectors';
import { deleteStatus } from './actions';
import { statusAttendace } from './graphql';

const GOOGLE_MAPS_API = 'https://www.google.com/maps/dir/?api=1&';

const buildNavigationLink = (coordinates: number[]) => {
  return `${GOOGLE_MAPS_API}destination=${coordinates[0]},${coordinates[1]}`;
};

const StyledPersonIcon = styled(PersonIcon).attrs<{joined: boolean}>({
  color: (props: any) => props.joined ? props.theme.errorLight : props.theme.secondaryDark,
})``;

const StatusContainer = styled(Flex)<{selected?: boolean}>`
  background: ${props => props.theme.background};
  border-bottom: 1px solid ${props => props.theme.border.default};

  ${props => props.selected && css`
    border-left: 8px solid ${props => props.theme.primary};
    box-shadow: 1px 1px 2px ${props => props.theme.shadow};
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
})`
  cursor: pointer;
`;

interface IStatusItemProps {
  status: StatusesInRadius_statusesInRadius_statuses;
  addAttendance: (statusId: string) => void;
  leaveAttendance: (attendaceId: string, statusId: string) => void;
  selectStatus?: () => void;
  isSelected?: boolean;
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

interface IStatusItemState {
  canAddLike: boolean;
  likeIdByLoggedInUser: string;
}

export class StatusItem extends React.Component<Props, IStatusItemState> {

  private statusMenuOptions: IMenuOption[];

  constructor(props: Props) {
    super(props);
    this.handleAddStatusLike = this.handleAddStatusLike.bind(this);
    this.handleRemoveStatusLike = this.handleRemoveStatusLike.bind(this);
    const likeByLoggedInUser = props.status.statusLikes.find(like => like.userId === props.userId);
    this.state = {
      canAddLike: !Boolean(likeByLoggedInUser),
      likeIdByLoggedInUser: likeByLoggedInUser ? likeByLoggedInUser.id : '',
    };
    this.statusMenuOptions = [
      {
        title: 'Edit',
        onClick: () => openModal.dispatch(ModalIds.status, {
          statusId: props.status.id,
          header: 'Edit status',
          submitText: 'Edit',
        }),
      },
      {
        title: 'Delete',
        onClick: () => deleteStatus.dispatch(props.status.id),
      },
    ];
  }

  public render() {
    const {
      status,
      isSelected,
      forwardedRef,
      selectStatus,
      userId,
      addAttendance,
      leaveAttendance,
    } = this.props;

    const totalNumberOfLikes = status.statusLikes.reduce((acc, like) => {
      return acc + like.count;
    }, 0);

    const isJoined = Boolean(status.attendance.find(({user}) => user.id === userId));
    const userAttendanceId = String(isJoined && status.attendance.find(a => a.user.id === userId)!.id);

    return (
      <StatusContainer
        paddingVertical={s2}
        marginBottom={s2}
        grow={1}
        key={status.id}
        direction="column"
        selected={isSelected}
        ref={forwardedRef}
      >
      <StatusContent paddingBottom={s2} paddingHorizontal={s5}>
      <Flex justify="space-between" align="center">
        <Title
          clickable
          paddingBottom={s1}
          onClick={selectStatus}
        >
          {status.title}
        </Title>
        {status.user.id === userId && (
          <MenuButton options={this.statusMenuOptions} />
        )}
      </Flex>
        <a
          target="_blank"
          href={buildNavigationLink(status.location!.coordinates)}
        >
          <Body disabled>{status.category.name}</Body>
          <Body disabled>{`${status.city} ${status.zipCode}, ${status.street}`}</Body>
        </a>
        <Link to={`/users/${status.user.id}`}>
          <Flex align="center" marginTop={s2}>
            <UserImage imgSrc={status.user.image} />
            <Flex direction="column" marginLeft={s2}>
              <Body>@{`${status.user.username}`}</Body>
              <Body disabled marginTop={s1}>{formatCreatedAt(status.createdAt)}</Body>
            </Flex>
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
        >
          <Flex align="center">
            <LikeIcon
              isLikedByUser={!this.state.canAddLike}
              onClick={this.state.canAddLike ? this.handleAddStatusLike : this.handleAddStatusLike}
            />
            <Body
              clickable
              marginLeft={s2}
              onClick={() => openModal.dispatch(ModalIds.statusLikes, {statusId: status.id})}
            >
              {totalNumberOfLikes}
            </Body>
          </Flex>
          <Flex align="center" marginLeft={s4}>
            <Flex align="center">
              <StyledPersonIcon joined={isJoined} />
              <Body marginLeft={s1}>{status.attendance.length || 0}</Body>
            </Flex>
            <Base marginLeft={s5}>
              <Button
                appearance="info"
                buttonSize="mini"
                text={isJoined ? 'Leave' : 'Join'}
                onClick={() => isJoined ?
                  leaveAttendance(userAttendanceId, status.id)
                  : addAttendance(status.id)
                }
              />
            </Base>
          </Flex>
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
            id: this.state.likeIdByLoggedInUser,
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
            this.setState({likeIdByLoggedInUser: addStatusLikeResult.data!.addStatusLike.id});
            const likedStatusIndex = statusesData.statusesInRadius.statuses.findIndex(({id}) => id === status.id);

            if (likedStatusIndex !== -1) {
              const likedStatus = statusesData.statusesInRadius.statuses[likedStatusIndex];
              const existingLikeIndex = likedStatus.statusLikes.findIndex(
                like => like.id === addStatusLikeResult.data!.addStatusLike.id,
              );

              const updatedLikedStatus = {
                ...likedStatus,
                statusLikes: existingLikeIndex !== -1 ?
                  [
                    ...likedStatus.statusLikes.slice(0, existingLikeIndex),
                    {
                      ...likedStatus.statusLikes[existingLikeIndex],
                      count: likedStatus.statusLikes[existingLikeIndex].count + 1,
                    },
                    ...likedStatus.statusLikes.slice(existingLikeIndex + 1),
                  ] : [
                  ...likedStatus.statusLikes,
                  {
                    ...addStatusLikeResult.data.addStatusLike,
                    userId,
                    count: 1,
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
          id: this.state.likeIdByLoggedInUser as string,
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
  graphql(statusAttendace, {
    options: (props: IStatusItemProps) => ({
      variables: {
        statusId: props.status.id,
      },
    }),
  }),
)(React.forwardRef((props: any, ref: RefObject<any>) => {
  return <StatusItem {...props} forwardedRef={ref} />;
}));
