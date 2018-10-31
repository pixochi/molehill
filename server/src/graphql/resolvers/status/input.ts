import {InputType, Field, ID} from 'type-graphql';

import StatusEntity from 'src/entity/status';
import { Location } from './types';

@InputType()
export class StatusInput implements Partial<StatusEntity> {
  @Field(() => ID)
  userId: string;

  @Field()
  description: string;

  @Field()
  title: string;

  @Field(() => Location)
  location: Location;
}
