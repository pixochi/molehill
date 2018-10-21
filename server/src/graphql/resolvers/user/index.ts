import {
  Resolver,
  Query,
  Mutation,
  Arg,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import UserEntity from 'src/entity/user';
import {UserInput} from 'src/graphql/resolvers/user/input';

@Resolver((of) => UserEntity)
export default class UserResolver {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Query((returns) => [UserEntity])
  async allUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  @Query((returns) => UserEntity)
  async user(@Arg('id') userId: string): Promise<UserEntity> {
    return await this.userRepository.findOne(userId);
  }

  @Mutation(returns => UserEntity)
  async addUser(@Arg('user') userInput: UserInput): Promise<Partial<UserEntity>> {
    const savedUser = await this.userRepository.save(userInput);
    return savedUser;
  }
}