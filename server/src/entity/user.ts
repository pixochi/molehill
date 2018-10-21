import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
@ObjectType()
export default class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Field()
  @Column()
  nickname: string;
}