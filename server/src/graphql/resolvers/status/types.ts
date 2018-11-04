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

@InputType()
export class StatusInput implements Partial<StatusEntity> {
  @Field(() => ID)
  userId: string;

  @Field()
  title: string;

  @Field({nullable: true})
  description: string;

  @Field(type => LocationInput)
  location: LocationInput;
}