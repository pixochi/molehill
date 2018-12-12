import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  ObjectType,
  Args,
  ID,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import UserEntity from 'src/entity/user';
import {SignUpInput, LoginInput} from 'src/graphql/resolvers/user/input';
import { writeFile } from '../helpers/fs';
import { UploadUserProfileImageArgs, UpdateUserBioArgs } from './types';

@ObjectType()
export class UploadedFile {
  @Field()
  filePath: string;
}

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
  async userById(@Arg('id', () => ID) userId: string): Promise<UserEntity> {
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
  async createUser(@Arg('user') newUser: SignUpInput): Promise<Partial<UserEntity>> {
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  @Mutation(returns => UserEntity)
  async updateUserBio(@Args() {bio, userId}: UpdateUserBioArgs): Promise<Partial<UserEntity> | any> {
    await this.userRepository.update(userId, {bio});
    return {id: userId};
  }

  @Mutation(returns => UploadedFile)
  async uploadProfileImage(@Args() {file, userId}: UploadUserProfileImageArgs): Promise<UploadedFile> {
      const { filename, stream } = await file;
      const fileRead = stream.read();
      const uploadedFile = await writeFile(`./uploads/${filename}`, filename, fileRead);
      await this.userRepository.update(userId, {image: uploadedFile.filePath});

      return uploadedFile;
  }
}
