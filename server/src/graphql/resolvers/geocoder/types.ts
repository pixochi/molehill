import { Field, ObjectType, Float, ArgsType } from 'type-graphql';

@ObjectType()
export class Address {
  @Field({nullable: true})
  city: string;

  @Field({nullable: true})
  suburb: string;

  @Field()
  country: string;

  @Field()
  countryCode: string;

  @Field()
  county: string;

  @Field()
  houseNumber: string;

  @Field()
  postcode: string;

  @Field()
  road: string;

  @Field()
  state: string;

  @Field()
  stateDistrict: string;

  @Field()
  town: string;
}

@ObjectType()
export class GeocodeReverseResponse {
  @Field(() => Address)
  address: Address;

  @Field()
  displayName: string;

  @Field({nullable: true})
  town: string;

  @Field()
  lat: string;

  @Field()
  lon: string;

  @Field()
  osmId: string;

  @Field()
  osmType: string;

  @Field()
  placeId: string;
}

@ArgsType()
export class GeocodeReverseQueryArgs {
  @Field(type => Float)
  latitude: number;

  @Field(type => Float)
  longitude: number;
}
