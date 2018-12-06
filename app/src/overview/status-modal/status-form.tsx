import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form, InjectedFormProps, reduxForm } from 'redux-form';
import { Map as LeafletMap, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { LeafletMouseEvent, LatLngLiteral } from 'leaflet';

import Button from 'app/components/button';
import FormField from 'app/components/form-elements/form-field';
import FormInput from 'app/components/form-elements/form-input';
import FormTextArea from 'app/components/form-elements/form-text-area';
import FormCheckbox from 'app/components/form-elements/checkbox/form-checkbox';
import Spinner from 'app/components/spinner';
import { Flex, Base } from 'app/components/styleguide/layout';
import { Body } from 'app/components/styleguide/text';
import UserIcon from 'app/components/user-leaflet-icon';

import { IFormProps } from 'app/components/form-elements/typings.d.ts';
import { IRootState } from 'app/redux/root-reducer';
import { s2 } from 'app/components/styleguide/spacing';
import styled from 'app/components/styleguide';

import { getCountry, getStreet, getCity, getZipCode, getIsFetchingAddress, getLat, getLng } from '../map/selectors';
import { StatusInput } from 'app/generated/graphql';
import { getStatusModalSubmitText, getNewStatusSelectedPosition } from './selectors';
import { setNewStatusLocation } from './actions';

export const STATUS_FORM = 'STATUS_FORM';
export const USE_CURRENT_LOCATION_FIELD  = 'useCurrentLocation';

const StyledMap = styled(LeafletMap)`
  height: 300px;
`;

export interface IInitialValues {
  initialValues?: {
    [K in keyof StatusInput]?: string | null;
  } | null;
}

type IStateProps = IInitialValues & {
  submitText: string;
  isFetchingAddress: boolean;
  userLat: number;
  userLng: number;
  selectedPosition?: LatLngLiteral;
};

type StateProps = IInitialValues & IStateProps;

type AddStatusFormProps = InjectedFormProps<StatusInput> & IFormProps & IInitialValues;

type Props = StateProps & AddStatusFormProps;

class AddStatusForm extends React.PureComponent<Props, {selectedPosition?: LatLngLiteral}> {

  private mapRef: React.RefObject<LeafletMap>;

  constructor(props: Props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {};
    this.handleOnContextMenu = this.handleOnContextMenu.bind(this);
  }

  // public componentDidUpdate(prevProps: Props) {
  //   if (!prevProps.initialValues.country && this.props.initialValues.country) {
  //     setNewStatusLocation.dispatch({
  //       lat: this.props.userLat,
  //       lng: this.props.userLng,
  //     });
  //   }
  // }

  public render() {
    const {
      handleSubmit,
      loading,
      isFetchingAddress,
      submitText,
      userLat,
      userLng,
      selectedPosition,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
          <FormField required name="title" component={FormInput} placeholder="Title" maxLength={64} />
          <FormField name="description" component={FormTextArea} placeholder="Description" />
          <Flex align="center">
            <FormField
              id={USE_CURRENT_LOCATION_FIELD}
              name={USE_CURRENT_LOCATION_FIELD}
              label="Use current location"
              component={FormCheckbox}
            />
            {isFetchingAddress && (
              <Base marginLeft={s2}>
                <Spinner />
              </Base>
            )}
          </Flex>
        <StyledMap
          oncontextmenu={this.handleOnContextMenu}
          ref={this.mapRef}
          center={{
            lat: userLat,
            lng: userLng,
          }}
          zoom={13}
        >
          <TileLayer
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={{
              lat: userLat,
              lng: userLng,
            }}
            icon={UserIcon}
          >
            <Tooltip>
              <Body emphasized>
                You are here.
              </Body>
            </Tooltip>
          </Marker>
          {Boolean(selectedPosition) && (
            <Marker
              position={{
                lat: selectedPosition!.lat,
                lng: selectedPosition!.lng,
              }}
            >
              <Tooltip>
                <Body emphasized>
                  Something is happening here!
                </Body>
              </Tooltip>
            </Marker>
          )}
        </StyledMap>
          <FormField required name="country" component={FormInput} placeholder="Country" />
          <FormField required name="city" component={FormInput} placeholder="City" />
          <FormField required name="zipCode" component={FormInput} placeholder="ZIP Code" />
          <FormField
            name="street"
            component={FormInput}
            placeholder="Street"
            formName={STATUS_FORM}
            clearable
            required
          />
          <Button loading={loading} text={submitText} type="submit" appearance="submit" fullWidth />
      </Form>
    );
  }

  private handleOnContextMenu(event: LeafletMouseEvent) {
    setNewStatusLocation.dispatch(event.latlng);
  }
}

export default compose<React.ComponentType<IFormProps & IInitialValues>>(
  connect<StateProps, {}, AddStatusFormProps, IRootState>((state, props) => ({
    initialValues: props.initialValues ? props.initialValues : {
      country: getCountry(state),
      street: getStreet(state),
      city: getCity(state),
      zipCode: getZipCode(state),
    },
    isFetchingAddress: getIsFetchingAddress(state),
    submitText: getStatusModalSubmitText(state),
    userLat: getLat(state),
    userLng: getLng(state),
    selectedPosition: getNewStatusSelectedPosition(state),
  })),
  reduxForm({
    form: STATUS_FORM,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  }),
)(AddStatusForm);
