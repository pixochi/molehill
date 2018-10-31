import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId} from 'typeorm';

import User from './user';
import { Location } from 'src/graphql/resolvers/status/types';

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
  @Column('text')
  description: string;

  @Field(() => Location)
  @Column('point')
  location: Location;

  @Field()
  @ManyToOne(type => User)
  user: User;

  @RelationId((status: Status) => status.user)
  userId: string;
}