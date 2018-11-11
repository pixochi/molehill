import {Field, ID, ObjectType} from 'type-graphql';
import { Point } from 'geojson';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

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

  @Field(() => User)
  @ManyToOne(type => User, user => user.statuses)
  user: User;
}