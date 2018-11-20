import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, ManyToOne, Column} from 'typeorm';

import User from './user';
import Status from './status';

@Entity()
@ObjectType()
export default class StatusLike {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => User)
  @ManyToOne(type => User, user => user.statusLikes)
  user: User;

  @Column('int', {nullable: true}) // TODO: remove nullable
  @Field(() => ID)
  userId: string;

  @Field(() => Status)
  @ManyToOne(type => Status, status => status.statusLikes)
  status: User;

  @Column('int', {nullable: true}) // TODO: remove nullable
  @Field(() => ID)
  statusId: string;
}