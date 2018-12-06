import {
  Resolver,
  Arg,
  Mutation,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import StatusLikeEntity from 'src/entity/status-like';
import UserEntity from 'src/entity/user';

import { StatusLikeInput } from './types';

@Resolver((of) => StatusLikeEntity)
export default class StatusResolver {

  constructor(
    @InjectRepository(StatusLikeEntity) private readonly statusLikesRepository: Repository<StatusLikeEntity>
  ) {}

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
  async removeStatusLike(@Arg('id') id: string): Promise<Partial<StatusLikeEntity>> {
    await this.statusLikesRepository.delete(id);
    return {id};
  }
}
