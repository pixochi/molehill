import { Field, ObjectType, Float, ArgsType } from 'type-graphql';

@ObjectType()
export class Address {
  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  // tslint:disable-next-line:variable-name
  country_code: string;

  @Field()
  county: string;

  @Field()
  // tslint:disable-next-line:variable-name
  house_number: string;

  @Field()
  postcode: string;

  @Field()
  road: string;

  @Field()
  state: string;

  @Field()
  // tslint:disable-next-line:variable-name
  state_district: string;

  @Field()
  town: string;
}

@ObjectType()
export class GeocoderResponse {
  @Field(() => Address)
  address: Address;

  @Field()
  // tslint:disable-next-line:variable-name
  display_name: string;

  @Field()
  town: string;

  @Field()
  lat: string;

  @Field()
  lon: string;

  @Field()
  // tslint:disable-next-line:variable-name
  osm_id: string;

  @Field()
  // tslint:disable-next-line:variable-name
  osm_type: string;

  @Field()
  // tslint:disable-next-line:variable-name
  place_id: string;
}

@ArgsType()
export class GeocodeQueryArgs {
  @Field(type => Float)
  latitude: number;

  @Field(type => Float)
  longitude: number;
}
