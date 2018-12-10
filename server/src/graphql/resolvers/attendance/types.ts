import { InputType, Field, ID } from 'type-graphql';

import AttendanceEntity from 'src/entity/attendance';

@InputType()
export class AttendanceInput implements Partial<AttendanceEntity> {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  statusId: string;

  @Field({nullable: true})
  private?: boolean;
}

