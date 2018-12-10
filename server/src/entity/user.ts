import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import Status from './status';
import Comment from './comment';
import StatusLike from './status-like';
import Attendance from './attendance';

@Entity()
@ObjectType()
export default class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({unique: true})
  username: string;

  @Field()
  @Column({unique: true})
  email: string;

  @Field()
  @Column()
  password: string;

  @Field({nullable: true})
  @Column({nullable: true})
  image: string;

  @Field({nullable: true})
  @Column({nullable: true})
  bio: string;

  @Field(() => Status)
  @OneToMany(type => Status, status => status.user)
  statuses: Status[];

  @Field(() => Comment)
  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  @Field(() => StatusLike)
  @OneToMany(type => StatusLike, statusLike => statusLike.user)
  statusLikes: StatusLike[];

  @Field(() => Attendance)
  @OneToMany(type => Attendance, attendance => attendance.user)
  attendance: Attendance[];
}