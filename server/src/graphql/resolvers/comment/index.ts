import {
  Resolver,
  Arg,
  Mutation,
  Query,
  Args,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import CommentEntity from 'src/entity/comment';
import UserEntity from 'src/entity/user';
import StatusEntity from 'src/entity/status';

import { CommentInput, StatusCommentsArgs, StatusCommentsWithCount } from './types';
import { BIG_INT_LIMIT } from '../constants';

@Resolver((of) => CommentEntity)
export default class StatusResolver {

  constructor(
    @InjectRepository(CommentEntity) private readonly commentRepository: Repository<CommentEntity>
  ) {}

  @Query((returns) => StatusCommentsWithCount)
  async statusComments(@Args() {statusId, limit, cursor}: StatusCommentsArgs): Promise<StatusCommentsWithCount> {
    const commentsAndCount = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where({
        status: {
          id: statusId
        },
      })
      .andWhere(cursor ? `comment.id < ${cursor}` : 'TRUE')
      .orderBy({'comment.id': 'DESC'})
      .take(limit ? limit : BIG_INT_LIMIT)
      .getManyAndCount();

    return {
      comments: commentsAndCount[0],
      count: commentsAndCount[1],
    };
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

  @Mutation(returns => CommentEntity)
  async deleteComment(@Arg('id') id: string): Promise<Partial<CommentEntity>> {
    await this.commentRepository.delete(id);

    return {
      id
    };
  }
}
