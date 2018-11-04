import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphql, DataProps } from 'react-apollo';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Point } from 'geojson';

import styled from 'app/components/styleguide';
import { s4 } from 'app/components/styleguide/spacing';
import { IRootState } from 'app/redux/root-reducer';
import { statusesInRadius } from 'app/overview/graphql';

import { Title } from 'app/components/styleguide/text';

import { getPermissionAllowed, UserCoordinates } from './selectors';
import { setLocation, blockLocation } from './actions';
import LocationErrorInfo from './location-error-info';
import UserIcon from './user-leaflet-icon';

const StyledMap = styled(LeafletMap)`
  height: 80vh;
  max-height: 500px;
`;

interface IStatusMapProps {
  userCoordinates: UserCoordinates;
  zoom?: number;
}

interface IStateProps {
  permissionAllowed: boolean;
  // statuses: IStatus[];
}

type Props = IStatusMapProps & IStateProps & DataProps<{statusesInRadius: IStatusResponse[]}>;

class StatusMap extends React.Component<Props> {

  public static defaultProps = {
    zoom: 13,
  };

  private watchId: number;
  private isGeolocationAvailable: boolean = true;
  private getLocation: () => number;

  constructor(props: any) {
    super(props);
    this.geolocationSuccessCallback = this.geolocationSuccessCallback.bind(this);
    this.geolocationErrorCallback = this.geolocationErrorCallback.bind(this);
    this.getLocation = () => {
      if (navigator.geolocation) {
        return navigator.geolocation.watchPosition(
          this.geolocationSuccessCallback,
          this.geolocationErrorCallback,
          {enableHighAccuracy: true},
        );
      }
      else {
        this.isGeolocationAvailable = false;
        return 0;
      }
    };
    this.getLocation = this.getLocation.bind(this);
  }

  public componentDidMount() {
    this.watchId = this.getLocation();
  }

  public componentWillMount() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  public render() {
    const {
      userCoordinates,
      data,
      zoom,
      permissionAllowed,
    } = this.props;

    if (!this.isGeolocationAvailable) {
      return <Title padding={s4}>Your browser does not support geolocation.</Title>;
    }

    if (!permissionAllowed) {
      return (
       <LocationErrorInfo
          infoMessage="If you want to see statuses near you, you need to enable location."
          ctaText="Enable location"
          onCtaClick={this.getLocation}
       />
      );
    }
    else if (userCoordinates.lat === undefined || userCoordinates.lng === undefined) {
      return (
        <LocationErrorInfo
          infoMessage="Failed to get your location."
          ctaText="Retry"
          onCtaClick={this.getLocation}
        />
      );
    }

    const userPosition = {
      lat: userCoordinates.lat,
      lng: userCoordinates.lng,
    };

    return (
      <StyledMap center={userPosition} zoom={zoom}>
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={userPosition} icon={UserIcon}>
          <Popup>
            You are here.
          </Popup>
        </Marker>
        {data.statusesInRadius && data.statusesInRadius.map(status => (
          <Marker
            key={status.id}
            position={{
              lat: status.location.coordinates[0],
              lng: status.location.coordinates[1],
            }}
          >
            <Popup>
              {status.title}
            </Popup>
          </Marker>
        ))}
      </StyledMap>
    );
  }

  private geolocationSuccessCallback(position: Position) {
    const {latitude, longitude} = position.coords;
    setLocation.dispatch(latitude, longitude);
  }

  private geolocationErrorCallback(position: PositionError) {
    blockLocation.dispatch();
  }
}

interface IStatusResponse {
  id: string;
  userId: string;
  title: string;
  location: Point;
  description?: string;
}

export default compose<React.ComponentType<IStatusMapProps>>(
  connect<IStateProps, {}, IStatusMapProps, IRootState>((state) => ({
    permissionAllowed: getPermissionAllowed(state),
  })),
  graphql<IStatusMapProps & IStateProps, IStatusResponse[]>(statusesInRadius, {
    options: (props) => ({
      variables: {
        radius: 15,
        latitude: props.userCoordinates.lat,
        longitude: props.userCoordinates.lng,
      },
    }),
    skip: ({userCoordinates}) => !userCoordinates.lat || !userCoordinates.lng,
  }),
)(StatusMap);
