import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

import User from './user';
import Status from './status';

@Entity()
@ObjectType()
export default class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Field()
  @Column('text')
  body: string;

  @Field(() => User, {nullable: true}) // TODO: remove nullable
  @ManyToOne(type => User, user => user.comments)
  user: User;

  @Field(() => Status)
  @ManyToOne(type => Status, status => status.comments)
  status: Status;
}