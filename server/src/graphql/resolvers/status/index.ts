import {
  Resolver,
  Query,
  Mutation,
  Arg,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import StatusEntity from 'src/entity/status';
import {StatusInput} from './input';
import { Location } from './types';
import UserEntity from 'src/entity/user';

@Resolver((of) => StatusEntity)
export default class StatusResolver {

  constructor(
    @InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>,
  ) {}

  @Query((returns) => StatusEntity)
  async status(@Arg('id') statusId: string): Promise<StatusEntity> {
   return await this.statusRepository.findOne(
      {
        id: statusId,
      },
      {
        relations: ['user'],
      }
    );
  }

  @Query((returns) => [StatusEntity])
  async statusByUser(@Arg('userId') userId: string): Promise<StatusEntity[]> {
    return await this.statusRepository.find(
      {
        relations: ['user'],
        where: {
          user: {
            id: userId,
          }
        }
      },
    );
  }

  @Mutation(returns => StatusEntity)
  async addStatus(@Arg('status') newStatus: StatusInput): Promise<Partial<StatusEntity>> {

    const user = new UserEntity();
    user.id = newStatus.userId;

    const savedStatus = await this.statusRepository.save({
      ...newStatus,
      location: `(${newStatus.location.x},${newStatus.location.y})` as unknown as Location,
      user,
    });

    return {
      ...savedStatus,
      location: newStatus.location,
    };
  }
}
