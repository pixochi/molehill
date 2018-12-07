import { InputType, Field, ID, ObjectType, Int } from 'type-graphql';

import StatusLikeEntity from 'src/entity/status-like';

@InputType()
export class StatusLikeInput implements Partial<StatusLikeEntity> {
  @Field(() => ID, {nullable: true})
  id?: string;

  @Field(() => ID)
  userId: string;
  user: any;

  @Field(() => ID)
  statusId: string;
}

@ObjectType()
export class LikeUser {
  @Field(type => Int)
  likeCount: number;

  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({nullable: true})
  image: string;

  @Field({nullable: true})
  bio: string;
}

@ObjectType()
export class LikesByUsers {
  @Field(type => [LikeUser])
  users: LikeUser[];
}