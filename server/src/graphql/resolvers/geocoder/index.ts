import {
  Resolver,
  Query,
  Args,
} from 'type-graphql';
import axios, { AxiosResponse } from 'axios';

import { buildUrlQuery } from 'src/graphql/helpers/url-query-builder';
import { GEOCODER_API } from '../constants';
import { GeocodeReverseResponse, GeocodeReverseQueryArgs } from './types';

@Resolver(of => GeocodeReverseResponse)
export default class GeocoderResolver {
  @Query((returns) => GeocodeReverseResponse)
  async geocodeReverse(@Args() {latitude, longitude}: GeocodeReverseQueryArgs): Promise<AxiosResponse<GeocodeReverseResponse>> {
    const urlQuery = buildUrlQuery({
      format: 'json',
      lat: latitude,
      lon: longitude,
      zoom: 18, // Level of detail required where 0 is country and 18 is house/building
      addressdetails: 1, // Include a breakdown of the address into elements
      'accept-language': 'en',
    });

    const url = `${GEOCODER_API}/reverse?${urlQuery}`;
    const response = await axios.get(url);

    const {
      address,
      display_name,
      osm_id,
      osm_type,
      place_id,
      ...rest
    } = response.data;

    const {
      country_code,
      house_number,
      state_district,
    } = address;

      return {
        ...rest,
        address: {
          ...address,
          countryCode: country_code,
          houseNumber: house_number,
          stateDistrict: state_district,
        },
        displayName: display_name,
        osmId: osm_id,
        osmType: osm_type,
        placeId: place_id,
      };
  }
}
