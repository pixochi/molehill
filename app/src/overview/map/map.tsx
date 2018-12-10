import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Map as LeafletMap, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet';

import styled from 'app/components/styleguide';
import { s4 } from 'app/components/styleguide/spacing';
import { IRootState } from 'app/redux/root-reducer';
import { statusesInRadius } from 'app/overview/graphql';

import { Title, Body } from 'app/components/styleguide/text';
import UserIcon from 'app/components/user-leaflet-icon';

import { getPermissionAllowed, getStopAutoRefetchStatuses } from './selectors';
import { setLocation, blockLocation } from './actions';
import LocationErrorInfo from './location-error-info';
import { StatusesInRadiusData } from '../types';
import { LeafletMouseEvent } from 'leaflet';
import { selectStatus } from '../actions';
import { getSelectedStatusId, getRadiusInMeters, getSelectedCategoryIds } from '../selectors';
import { StatusesInRadius } from 'app/generated/graphql';

const StyledMap = styled(LeafletMap)`
  height: 50vh;
  max-height: 500px;
`;

interface IStatusMapProps {
  userLat?: number;
  userLng?: number;
  zoom?: number;
  className?: string;
}

interface IStateProps {
  permissionAllowed: boolean;
  selectedStatusId: string;
  radius: number;
  stopAutoRefetchStatuses: boolean;
  selectedCategories?: string[];
}

type Props = IStatusMapProps & IStateProps & StatusesInRadiusData;

class StatusMap extends React.Component<Props> {

  public static defaultProps = {
    zoom: 13,
  };

  private watchId: number;
  private isGeolocationAvailable: boolean = true;
  private getLocation: () => number;
  private markerRef: React.RefObject<Marker>;
  private mapRef: React.RefObject<LeafletMap>;
  private userMarkerRef: React.RefObject<Marker>;

  constructor(props: any) {
    super(props);
    this.geolocationSuccessCallback = this.geolocationSuccessCallback.bind(this);
    this.geolocationErrorCallback = this.geolocationErrorCallback.bind(this);
    this.getLocation = () => {
      if (navigator.geolocation) {
        console.log('getting location');
        return navigator.geolocation.watchPosition(
          this.geolocationSuccessCallback,
          this.geolocationErrorCallback,
          {enableHighAccuracy: false},
        );
      }
      else {
        this.isGeolocationAvailable = false;
        return 0;
      }
    };
    this.getLocation = this.getLocation.bind(this);
    this.markerRef = React.createRef();
    this.mapRef = React.createRef();
    this.userMarkerRef = React.createRef();
  }

  public componentDidMount() {
    this.watchId = this.getLocation();
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.markerRef.current && this.mapRef.current && prevProps.selectedStatusId !== this.props.selectedStatusId) {
      const markerElement = this.markerRef.current.leafletElement;
      const mapElement = this.mapRef.current.leafletElement;
      const shouldAnimate = !mapElement.getBounds().contains(markerElement.getLatLng());

      mapElement.flyTo(markerElement.getLatLng(), mapElement.getZoom(), {animate: shouldAnimate});
      markerElement.openPopup();
      markerElement.closeTooltip();
    }

    if (this.userMarkerRef.current) {
      const userMarkerElement = this.userMarkerRef.current.leafletElement;

      if (this.props.stopAutoRefetchStatuses || (this.props.data && this.props.data.loading)) {
        userMarkerElement.openPopup();
      }
      else {
        userMarkerElement.closePopup();
      }
    }
  }

  public componentWillMount() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  public render() {
    const {
      userLat,
      userLng,
      data,
      zoom,
      permissionAllowed,
      className,
      selectedStatusId,
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
    else if (userLat === undefined || userLng === undefined) {
      return (
        <LocationErrorInfo
          infoMessage="Failed to get your location."
          ctaText="Retry"
          onCtaClick={this.getLocation}
        />
      );
    }

    const userPosition = {
      lat: userLat,
      lng: userLng,
    };

    return (
      <StyledMap className={className} center={userPosition} zoom={zoom} ref={this.mapRef}>
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={userPosition} icon={UserIcon} ref={this.userMarkerRef as React.RefObject<any>}>
          <Tooltip>
            <Body emphasized>
              You are here.
            </Body>
          </Tooltip>
          <Popup>
            <Body emphasized>Loading...</Body>
          </Popup>
        </Marker>
        {data && data.statusesInRadius && data.statusesInRadius.statuses.map(status => (
          <Marker
            key={status.id}
            value={status.id}
            position={{
              lat: status.location.coordinates[0],
              lng: status.location.coordinates[1],
            }}
            onClick={this.handleMarkerClicked}
            ref={selectedStatusId === status.id ? this.markerRef as React.RefObject<any> : ''}
          >
            <Popup>
              <Body emphasized>
                {status.title}
              </Body>
            </Popup>
            <Tooltip>
              <Body emphasized>
                {status.title}
              </Body>
            </Tooltip>
          </Marker>
        ))}
      </StyledMap>
    );
  }

  private geolocationSuccessCallback(position: Position) {
    const {latitude, longitude} = position.coords;
    console.log('location found', {latitude, longitude});
    setLocation.dispatch(latitude, longitude);
  }

  private geolocationErrorCallback(position: PositionError) {
    console.log('location error cb');
    blockLocation.dispatch();
  }

  private handleMarkerClicked(markerClickEvent: LeafletMouseEvent) {
    const statusId = markerClickEvent.target.options.value;
    selectStatus.dispatch(statusId);
  }

}

export default compose<React.ComponentType<IStatusMapProps>>(
  connect<IStateProps, {}, IStatusMapProps, IRootState>((state) => ({
    permissionAllowed: getPermissionAllowed(state),
    selectedStatusId: getSelectedStatusId(state),
    radius: getRadiusInMeters(state),
    stopAutoRefetchStatuses: getStopAutoRefetchStatuses(state),
    selectedCategories: getSelectedCategoryIds(state),
  })),
  graphql<IStatusMapProps & IStateProps, StatusesInRadius>(statusesInRadius, {
    options: (props) => ({
      variables: {
        radius: props.radius,
        categoryIds: props.selectedCategories,
        latitude: props.userLat,
        longitude: props.userLng,
        skip: props.stopAutoRefetchStatuses,
        limit: 5,
      },
    }),
    skip: ({userLat, userLng}) => !userLat || !userLng,
  }),
)(StatusMap);
