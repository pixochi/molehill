import {
  Resolver,
  Arg,
  Mutation,
  Query,
  ID,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import CommentEntity from 'src/entity/comment';
import UserEntity from 'src/entity/user';
import StatusEntity from 'src/entity/status';
import AttendanceEntity from 'src/entity/attendance';

import { AttendanceInput } from './types';

@Resolver((of) => AttendanceEntity)
export default class AttendanceResolver {

  constructor(
    @InjectRepository(AttendanceEntity) private readonly attendanceRepository: Repository<AttendanceEntity>
  ) {}

  @Query((returns) => [AttendanceEntity])
  async statusAttendance(@Arg('statusId', () => ID) statusId: string): Promise<AttendanceEntity[]> {
    const attendanceUsers = await this.attendanceRepository
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.user', 'user')
      .leftJoinAndSelect('attendance.status', 'status')
      .where({
        status: {
          id: statusId
        },
      })
      .orderBy({'attendance.createdAt': 'DESC'})
      .getMany();

    return attendanceUsers;
  }

  @Mutation(returns => CommentEntity)
  async addAttendance(@Arg('attendance') attendance: AttendanceInput): Promise<Partial<AttendanceEntity>> {
    const user = new UserEntity();
    user.id = attendance.userId;

    const status = new StatusEntity();
    status.id = attendance.statusId;

    const savedAttendance = await this.attendanceRepository.save({
      ...attendance,
      user,
      status,
    });

    return savedAttendance;
  }

  @Mutation(returns => AttendanceEntity)
  async deleteAttendance(@Arg('id', () => ID) id: string): Promise<{id: string}> {
    await this.attendanceRepository.delete(id);

    return {
      id
    };
  }

}
