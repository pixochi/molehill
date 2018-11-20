import { InputType, Field, ID } from 'type-graphql';

import StatusLikeEntity from 'src/entity/status-like';

@InputType()
export class StatusLikeInput implements Partial<StatusLikeEntity> {
  @Field(() => ID)
  userId: string;
  user: any;

  @Field(() => ID)
  statusId: string;
}