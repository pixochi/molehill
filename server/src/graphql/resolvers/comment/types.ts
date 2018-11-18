import { InputType, Field, ID } from 'type-graphql';

import CommentEntity from 'src/entity/comment';

@InputType()
export class CommentInput implements Partial<CommentEntity> {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  statusId: string;

  @Field()
  body: string;
}