import { ObjectType, InputType, Field, ID, Float, ArgsType, Int } from 'type-graphql';
import StatusEntity from 'src/entity/status';

@ObjectType()
@InputType('LocationIn')
export class LocationInput {
  @Field()
  type: 'Point';

  @Field(type => [Float])
  coordinates: number[];
}

@InputType()
export class StatusInput implements Partial<StatusEntity> {
  @Field(() => ID)
  userId: string;

  @Field()
  title: string;

  @Field({nullable: true})
  description?: string;

  @Field(type => LocationInput, {nullable: true})
  location?: LocationInput;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  zipCode: string;

  @Field()
  street: string;

  @Field({nullable: true})
  useCurrentLocation?: boolean;
}

@InputType()
export class EditStatusInput implements Partial<StatusEntity> {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({nullable: true})
  description?: string;

  @Field(type => LocationInput, {nullable: true})
  location?: LocationInput;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  zipCode: string;

  @Field()
  street: string;

  @Field({nullable: true})
  useCurrentLocation?: boolean;
}

@ArgsType()
export class StatusesInRadiusArgs {
  @Field(type => Float)
  radius: number;

  @Field(type => Float)
  latitude: number;

  @Field(type => Float)
  longitude: number;

  @Field(type => Int, {nullable: true})
  limit: number;

  @Field({nullable: true})
  cursor: string;
}

@ObjectType()
export class StatusesInRadiusWithCount {
  @Field(type => [StatusEntity])
  statuses: StatusEntity[];

  @Field(type => Int)
  count: number;
}