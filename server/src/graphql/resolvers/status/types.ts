import { ObjectType, InputType, Field } from 'type-graphql';


@ObjectType()
@InputType('LocationInput')
export class Location {
  @Field()
  x: number;

  @Field()
  y: number;
}