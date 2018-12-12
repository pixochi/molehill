import { ArgsType, Field, ID } from 'type-graphql';
import { GraphQLUpload, Upload } from 'graphql-upload';

@ArgsType()
export class UploadUserProfileImageArgs {
  @Field(type => GraphQLUpload)
  file: Upload;

  @Field(() => ID)
  userId: string;
}

@ArgsType()
export class UpdateUserBioArgs {
  @Field()
  bio: string;

  @Field(() => ID)
  userId: string;
}