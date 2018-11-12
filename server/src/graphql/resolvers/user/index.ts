import {
  Resolver,
  Query,
  Mutation,
  Arg,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Upload, GraphQLUpload } from 'graphql-upload';

import UserEntity from 'src/entity/user';
import {SignUpInput, LoginInput} from 'src/graphql/resolvers/user/input';
import { createWriteStream } from 'fs';

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
  async userById(@Arg('id') userId: string): Promise<UserEntity> {
    return await this.userRepository.findOne(userId);
  }

  @Mutation((returns) => UserEntity)
  async login(@Arg('loginInput') loginInput: LoginInput): Promise<UserEntity | undefined> {
    const foundUser = await this.userRepository.findOne({
      email: loginInput.email,
      password: loginInput.password,
    });

    return foundUser;
  }

  @Mutation(returns => UserEntity)
  async createUser(@Arg('user') newUser: SignUpInput): Promise<Partial<UserEntity> | any> {
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  @Mutation(returns => UserEntity)
  async uploadProfileImage(@Arg('file', type => GraphQLUpload) file: Upload): Promise<UserEntity> {
      const { filename, stream } = await file;
      const fileRead = stream.read();

      const writeStream = createWriteStream(`./${filename}`);
      writeStream.write(fileRead, async () => {
        return await this.userRepository.findOne('1');
      });

      return await this.userRepository.findOne('1');
  }
}
