import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import Status from './status';

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

  @Field(() => Status)
  @OneToMany(type => Status, status => status.user)
  statuses: Status[];
}