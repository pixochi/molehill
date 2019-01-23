import {Field, ID, ObjectType} from 'type-graphql';
import { Point } from 'geojson';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn} from 'typeorm';

import { LocationInput } from 'src/graphql/resolvers/status/types';
import User from './user';
import Comment from './comment';
import StatusLike from './status-like';
import StatusCategory from './status-category';
import Attendance from './attendance';

@Entity()
@ObjectType()
export default class Status {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({length: 64})
  title: string;

  @Field()
  @Column({length: 64})
  country: string;

  @Field()
  @Column({length: 64})
  city: string;

  @Field()
  @Column({length: 16})
  zipCode: string;

  @Field()
  @Column({length: 128})
  street: string;

  @Field({nullable: true})
  @Column('text', {nullable: true})
  description: string;

  @Field(() => LocationInput)
  @Column('geometry', {
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Point;

  @Field()
  @CreateDateColumn({type: 'timestamp with time zone'})
  createdAt: Date;

  @Field(() => User)
  @ManyToOne(type => User, user => user.statuses)
  user: User;

  @Field(() => StatusCategory)
  @ManyToOne(type => StatusCategory, category => category.status)
  category: StatusCategory;

  @Field(() => Comment)
  @OneToMany(type => Comment, comment => comment.status)
  comments: Comment[];

  @Field(() => StatusLike)
  @OneToMany(type => StatusLike, statusLike => statusLike.status)
  statusLikes: StatusLike[];

  @Field(() => Attendance)
  @OneToMany(type => Attendance, statusAttendance => statusAttendance.status)
  attendance: Attendance[];
}