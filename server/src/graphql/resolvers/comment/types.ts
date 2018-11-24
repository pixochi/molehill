import { InputType, Field, ID, ArgsType, Int, ObjectType } from 'type-graphql';

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

@InputType()
export class EditCommentInput implements Partial<CommentEntity> {
  @Field(() => ID)
  commentId: string;

  @Field()
  body: string;
}

@ArgsType()
export class StatusCommentsArgs {
  @Field()
  statusId: string;

  @Field(type => Int, {nullable: true})
  limit: number;

  @Field({nullable: true})
  cursor: string;
}

@ObjectType()
export class StatusCommentsWithCount {
  @Field(type => [CommentEntity])
  comments: CommentEntity[];

  @Field(type => Int)
  count: number;
}

