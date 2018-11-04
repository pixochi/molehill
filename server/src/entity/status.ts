import {Field, ID, ObjectType} from 'type-graphql';
import { Point } from 'geojson';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId} from 'typeorm';

import User from './user';
import { LocationInput } from 'src/graphql/resolvers/status/types';

@Entity()
@ObjectType()
export default class Status {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Field()
  @Column({length: 64})
  title: string;

  @Field()
  @Column('text', {nullable: true})
  description: string;

  @Field(() => LocationInput)
  @Column('geometry', {
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Point;

  @Field()
  @ManyToOne(type => User)
  user: User;

  @RelationId((status: Status) => status.user)
  userId: string;
}