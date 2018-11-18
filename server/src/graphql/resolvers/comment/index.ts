import {
  Resolver,
  Arg,
  Mutation,
  Query,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import CommentEntity from 'src/entity/comment';
import UserEntity from 'src/entity/user';
import StatusEntity from 'src/entity/status';

import { CommentInput } from './types';

@Resolver((of) => CommentEntity)
export default class StatusResolver {

  constructor(
    @InjectRepository(CommentEntity) private readonly commentRepository: Repository<CommentEntity>
  ) {}

  @Query((returns) => [CommentEntity])
  async statusComments(@Arg('statusId') statusId: string): Promise<CommentEntity[]> {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where({
        status: {
          id: statusId
        },
      })
      .limit(5)
      .orderBy({'comment.id': 'ASC'})
      .getMany();

    return comments;
  }

  @Mutation(returns => CommentEntity)
  async addComment(@Arg('comment') comment: CommentInput): Promise<Partial<CommentEntity>> {
    const user = new UserEntity();
    user.id = comment.userId;

    const status = new StatusEntity();
    status.id = comment.statusId;

    const savedComment = await this.commentRepository.save({
      ...comment,
      user,
      status,
    });

    return savedComment;
  }
}
