import { ObjectType, InputType, Field, ID, Float } from 'type-graphql';
import StatusEntity from 'src/entity/status';

@ObjectType()
@InputType('LocationIn')
export class LocationInput {
  @Field()
  type: 'Point';

  @Field(type => [Float])
  coordinates: number[];
}

@InputType('StatusType')
export class StatusInput implements Partial<StatusEntity> {
  @Field(() => ID)
  userId: string;

  @Field()
  description: string;

  @Field()
  title: string;

  @Field(type => LocationInput)
  location: LocationInput;
}