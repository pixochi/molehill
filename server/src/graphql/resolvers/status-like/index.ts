import {
  Resolver,
  Arg,
  Mutation,
  Query,
  ID,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import StatusLikeEntity from 'src/entity/status-like';
import StatusEntity from 'src/entity/status';
import UserEntity from 'src/entity/user';

import { StatusLikeInput, LikesByUsers } from './types';

@Resolver((of) => StatusLikeEntity)
export default class StatusResolver {

  constructor(
    @InjectRepository(StatusLikeEntity) private readonly statusLikesRepository: Repository<StatusLikeEntity>,
    @InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  @Query((returns) => LikesByUsers)
  async likesByUsers(@Arg('statusId', () => ID) statusId: string): Promise<LikesByUsers> {
    const statusWithLikes = await this.statusRepository
      .createQueryBuilder('status')
      .where({id: statusId})
      .leftJoinAndSelect('status.statusLikes', 'likes')
      .getOne();

    const userIds = statusWithLikes.statusLikes.map((like) => like.userId);

    const users = await this.userRepository
      .createQueryBuilder()
      .whereInIds(userIds)
      .getMany();

    const usersWithLikeCounts = users.map(user => {
      return {
        ...user,
        likeCount: statusWithLikes.statusLikes
          .find(like => like.userId === user.id)!.count
      };
    });

      return {
        users: usersWithLikeCounts,
      };
  }

  @Mutation(returns => StatusLikeEntity)
  async addStatusLike(@Arg('like') like: StatusLikeInput): Promise<Partial<StatusLikeEntity>> {
    const user = new UserEntity();
    user.id = like.userId;

    if (like.id) {
      await this.statusLikesRepository.increment({
        id: like.id,
      }, 'count', 1);

      return {
        ...like,
        user
      };
    }
    else {
      const savedLike = await this.statusLikesRepository.save({
        user,
        statusId: like.statusId,
      });

      return {
        ...savedLike,
        user
      };
    }

  }

  @Mutation(returns => StatusLikeEntity)
  async removeStatusLike(@Arg('id', () => ID) id: string): Promise<Partial<StatusLikeEntity>> {
    await this.statusLikesRepository.delete(id);
    return {id};
  }
}
