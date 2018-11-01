import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import styled from 'styled-components';
import { LatLng } from 'leaflet';

import { Title } from 'app/components/styled-components/text';
import Button from 'app/components/button';
import { Flex, Base } from 'app/components/styled-components/layout';
import { s4 } from 'app/components/styled-components/spacing';

const StyledMap = styled(LeafletMap)`
  height: 80vh;
  max-height: 500px;
`;

interface IStateProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  permissionAllowed?: boolean;
}

class StatusMap extends React.Component<{}, IStateProps> {

  public state: IStateProps = {};
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

    if (!this.isGeolocationAvailable) {
      return <Title padding={s4}>Your browser does not support geolocation.</Title>;
    }

    if (!this.state.permissionAllowed) {
      return (
        <Flex direction="column" align="center" padding={s4}>
          <Title textAlign="center">If you want to see statuses near you, you need to enable location.</Title>
          <Base marginTop={s4}>
            <Button text="Enable location" appearance="info" onClick={this.getLocation}/>
          </Base>
        </Flex>
      );
    }

    const position = {
      lat: this.state.lat,
      lng: this.state.lng,
    } as LatLng;

    return (
      <StyledMap center={position} zoom={this.state.zoom}>
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
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      zoom: 13,
      permissionAllowed: true,
    });
  }

  private geolocationErrorCallback(position: PositionError) {
    this.setState({
      permissionAllowed: false,
    });
  }
}

export default StatusMap;
