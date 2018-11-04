import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

import styled from 'app/components/styleguide';
import { s4 } from 'app/components/styleguide/spacing';
import { IRootState } from 'app/redux/root-reducer';

import { Title } from 'app/components/styleguide/text';

import { getPermissionAllowed, getCoordinates } from './selectors';
import { setLocation, blockLocation } from './actions';
import LocationErrorInfo from './location-error-info';

const StyledMap = styled(LeafletMap)`
  height: 80vh;
  max-height: 500px;
`;

interface IStatusMapProps {
  zoom?: number;
}

interface IStateProps {
  permissionAllowed: boolean;
  coordinates: {
    lat?: number,
    lng?: number,
  };
}

type Props = IStatusMapProps & IStateProps;

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
      coordinates,
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
    else if (coordinates.lat === undefined || coordinates.lng === undefined) {
      return (
        <LocationErrorInfo
          infoMessage="Failed to get your location."
          ctaText="Retry"
          onCtaClick={this.getLocation}
        />
      );
    }

    const position = {
      lat: coordinates.lat,
      lng: coordinates.lng,
    };

    return (
      <StyledMap center={position} zoom={zoom}>
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            You are here.
          </Popup>
        </Marker>
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

export default compose(
  connect<IStateProps, {}, IStatusMapProps, IRootState>((state) => ({
    permissionAllowed: getPermissionAllowed(state),
    coordinates: getCoordinates(state),
  })),
)(StatusMap);
