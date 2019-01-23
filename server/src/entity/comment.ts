import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';

import User from './user';
import Status from './status';

@Entity()
@ObjectType()
export default class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Field()
  @CreateDateColumn({type: 'timestamp with time zone'})
  createdAt: Date;

  @Field()
  @Column('text')
  body: string;

  @Field(() => User)
  @ManyToOne(type => User, user => user.comments)
  user: User;

  @Field(() => Status)
  @ManyToOne(type => Status, status => status.comments, { onDelete: 'CASCADE' })
  status: Status;
}