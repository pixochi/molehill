import {InputType, Field} from 'type-graphql';

import UserEntity from 'src/entity/user';

@InputType()
export class SignUpInput implements Partial<UserEntity> {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput implements Partial<UserEntity> {
  @Field()
  email: string;

  @Field()
  password: string;
}