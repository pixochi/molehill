import {Field, ID, ObjectType, Int} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique} from 'typeorm';

import User from './user';
import Status from './status';

@Entity()
@ObjectType()
@Unique('UQ_LIKE', ['userId', 'statusId'])
export default class StatusLike {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => Int)
  @Column('int', {default: 1})
  count: number;

  @Field(() => User)
  @ManyToOne(type => User, user => user.statusLikes)
  user: User;

  @Column('int', {nullable: true}) // TODO: remove nullable
  @Field(() => ID)
  userId: string;

  @Field(() => Status)
  @ManyToOne(type => Status, status => status.statusLikes, { onDelete: 'CASCADE' })
  status: User;

  @Column('int', {nullable: true}) // TODO: remove nullable
  @Field(() => ID)
  statusId: string;
}