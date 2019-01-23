import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';

import User from './user';
import Status from './status';

@Entity()
@ObjectType()
export default class Attendance {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @CreateDateColumn({type: 'timestamp with time zone'})
  createdAt: Date;

  @Field({nullable: true})
  @Column({nullable: true})
  private: boolean;

  @Field(() => ID, {nullable: true})
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(type => User, user => user.attendance)
  user: User;

  @Field(() => Status)
  @ManyToOne(type => Status, status => status.attendance, { onDelete: 'CASCADE' })
  status: Status;
}