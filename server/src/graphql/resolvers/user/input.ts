import {InputType, Field} from 'type-graphql';

import UserEntity from 'src/entity/user';

@InputType()
export class UserInput implements Partial<UserEntity> {
  @Field()
  nickname: string;
}