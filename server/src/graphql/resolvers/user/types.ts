import { ArgsType, Field } from 'type-graphql';
import { GraphQLUpload, Upload } from 'graphql-upload';

@ArgsType()
export class UploadUserProfileImageArgs {
  @Field(type => GraphQLUpload)
  file: Upload;

  @Field()
  userId: string;
}

@ArgsType()
export class UpdateUserBioArgs {
  @Field()
  bio: string;

  @Field()
  userId: string;
}