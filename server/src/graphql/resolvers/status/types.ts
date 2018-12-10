import { ObjectType, InputType, Field, ID, Float, ArgsType, Int } from 'type-graphql';

import StatusEntity from 'src/entity/status';
import UserEntity from 'src/entity/user';
import CategoryEntity from 'src/entity/status-category';
import StatusLike from 'src/entity/status-like';

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

  @Field()
  categoryId: string;

  @Field({nullable: true})
  useCurrentLocation?: boolean;
}

@InputType()
export class EditStatusInput implements Partial<StatusEntity> {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  categoryId: string;

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

  @Field(type => [ID], {nullable: true})
  categoryIds?: string[];

  @Field(type => Float)
  latitude: number;

  @Field(type => Float)
  longitude: number;

  @Field(type => Int, {nullable: true})
  limit: number;

  @Field({nullable: true})
  cursor: string;
}

// for some reason can't just extend StatusEntity
@ObjectType()
export class StatusEntityWithAttendanceCount {
  @Field(() => ID)
  id: string;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => CategoryEntity)
  category: CategoryEntity;

  @Field(() => [StatusLike])
  statusLikes: StatusLike[];

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

  @Field()
  createdAt: Date;

  @Field({nullable: true})
  useCurrentLocation?: boolean;

  @Field(type => Int)
  attendance: number;
}

@ObjectType()
export class StatusesWithCount {
  @Field(type => [StatusEntityWithAttendanceCount])
  statuses: StatusEntityWithAttendanceCount[];

  @Field(type => Int)
  count: number;
}