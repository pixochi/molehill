import {
  Resolver,
  Query,
  Args,
} from 'type-graphql';
import axios, { AxiosResponse } from 'axios';

import { buildUrlQuery } from 'src/graphql/helpers/url-query-builder';
import { GeocoderResponse, GeocodeQueryArgs } from './types';

const GEOCODER_API = 'https://nominatim.openstreetmap.org/reverse';

@Resolver(of => GeocoderResponse)
export default class GeocoderResolver {
  @Query((returns) => GeocoderResponse)
  async geocode(@Args() {latitude, longitude}: GeocodeQueryArgs): Promise<AxiosResponse<GeocoderResponse>> {
    const urlQuery = buildUrlQuery({
      format: 'json',
      lat: latitude,
      lon: longitude,
      zoom: 13, // Level of detail required where 0 is country and 18 is house/building
      addressdetails: 1, // Include a breakdown of the address into elements
    });

    const url = `${GEOCODER_API}?${urlQuery}`;
    return await axios.get(url).then(response => response.data);
  }
}
