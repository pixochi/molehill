import {Field, ID, ObjectType} from 'type-graphql';
import { Point } from 'geojson';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn} from 'typeorm';

import { LocationInput } from 'src/graphql/resolvers/status/types';
import User from './user';
import Comment from './comment';
import StatusLike from './status-like';

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
  @Column()
  country: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  zipCode: string;

  @Field()
  @Column()
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
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @Field(() => User)
  @ManyToOne(type => User, user => user.statuses)
  user: User;

  @Field(() => Comment)
  @OneToMany(type => Comment, comment => comment.status, { onDelete: 'CASCADE' })
  comments: Comment[];

  @Field(() => StatusLike)
  @OneToMany(type => StatusLike, statusLike => statusLike.status, { onDelete: 'CASCADE' })
  statusLikes: StatusLike[];
}