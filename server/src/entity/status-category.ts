import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import Status from './status';

@Entity()
@ObjectType()
export default class StatusCategory {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({unique: true, length: 64})
  name: string;

  @Field(() => Status)
  @OneToMany(type => Status, status => status.category)
  status: Status;
}