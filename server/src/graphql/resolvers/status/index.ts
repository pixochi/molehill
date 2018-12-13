import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Args,
  ID,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import axios from 'axios';

import StatusEntity from 'src/entity/status';
import StatusCategoryEntity from 'src/entity/status-category';
import UserEntity from 'src/entity/user';
import { buildUrlQuery } from 'src/graphql/helpers/url-query-builder';

import { StatusInput, EditStatusInput, StatusesInRadiusArgs, StatusesWithCount } from './types';
import { GEOCODER_API, BIG_INT_LIMIT } from '../constants';

@Resolver((of) => StatusEntity)
export default class StatusResolver {

  constructor(
    @InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>,
    @InjectRepository(StatusCategoryEntity) private readonly statusCategoryRepository: Repository<StatusCategoryEntity>,
  ) {}
  @Query((returns) => StatusEntity)
  async status(@Arg('id', () => ID) statusId: string): Promise<StatusEntity> {
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
  async allStatuses(): Promise<StatusEntity[]> {
    return await this.statusRepository.find();
  }

  @Query((returns) => StatusesWithCount)
  async statusesInRadius(@Args() { radius, latitude, longitude, limit, cursor, categoryIds }: StatusesInRadiusArgs): Promise<StatusesWithCount> {
    const statusesWithUser = await this.statusRepository
      .createQueryBuilder('status')
      .leftJoinAndSelect('status.user', 'user')
      .leftJoinAndSelect('status.statusLikes', 'likes')
      .leftJoinAndSelect('status.category', 'category')
      .leftJoinAndSelect('status.attendance', 'attendance')
      .where('ST_Distance_Sphere(location, ST_MakePoint(:latitude,:longitude)) <= :radius', {
        radius,
        latitude,
        longitude,
      })
      .andWhere(cursor ? `status.id < ${cursor}` : 'TRUE')
      .andWhere(categoryIds ? `status.category_id IN (${categoryIds.join(',')})` : 'TRUE')
      .take(limit ? limit : BIG_INT_LIMIT)
      .orderBy('status.createdAt', 'DESC')
      .getManyAndCount();

      return {
        statuses: statusesWithUser[0].map(status => ({
          ...status,
          attendance: status.attendance.map(attendance => ({
            ...attendance,
            user: {
              ...attendance.user,
              id: attendance.userId,
            }
          })),
        })),
        count: statusesWithUser[1],
      };
  }

  @Query((returns) => StatusesWithCount)
  async statusesByUser(@Arg('userId', () => ID) userId: string): Promise<StatusesWithCount> {
    const statusesWithUser = await this.statusRepository
      .createQueryBuilder('status')
      .leftJoinAndSelect('status.user', 'user')
      .leftJoinAndSelect('status.statusLikes', 'likes')
      .leftJoinAndSelect('status.category', 'category')
      .leftJoinAndSelect('status.attendance', 'attendance')
      .where({user: {
        id: userId,
      }})
      .orderBy('status.createdAt', 'DESC')
      .getManyAndCount();

      return {
        statuses: statusesWithUser[0].map(status => ({
          ...status,
          attendance: status.attendance.map(attendance => ({
            ...attendance,
            user: {
              ...attendance.user,
              id: attendance.userId,
            }
          })),
        })),
        count: statusesWithUser[1],
      };
  }

  @Query((returns) => [StatusCategoryEntity])
  async allCategories(): Promise<StatusCategoryEntity[]> {
    const categories = await this.statusCategoryRepository.find();

      return categories;
  }

  @Mutation(returns => StatusEntity)
  async addStatus(@Arg('status') newStatus: StatusInput): Promise<Partial<StatusEntity>> {

    const user = new UserEntity();
    user.id = newStatus.userId;

    const category = await this.statusCategoryRepository.findOne(newStatus.categoryId);

    let statusLocation = newStatus.location;

    if (!newStatus.useCurrentLocation) {
      const urlQuery = buildUrlQuery({
        street: newStatus.street,
        city: newStatus.city,
        country: newStatus.country,
        postalcode: newStatus.zipCode,
        format: 'json',
        namedetails: 0, // Include a list of alternative names in the results
        addressdetails: 0, // Include a breakdown of the address into elements
        'accept-language': 'en',
      });
      const url = `${GEOCODER_API}/search?${urlQuery}`;
      const response = await axios.get(url);
      const {lat, lon} = response.data.length ? response.data[0] : {} as any;

      statusLocation = {
        type: 'Point',
        coordinates: [lat, lon],
      };
    }

    const savedStatus = await this.statusRepository.save({
      ...newStatus,
      location: statusLocation,
      user,
      category,
    });

    return savedStatus;
  }

  @Mutation(returns => StatusEntity)
  async editStatus(@Arg('status') status: EditStatusInput): Promise<Partial<StatusEntity>> {

    let statusLocation = status.location;

    if (!status.useCurrentLocation) {
      const urlQuery = buildUrlQuery({
        street: status.street,
        city: status.city,
        country: status.country,
        postalcode: status.zipCode,
        format: 'json',
        namedetails: 0, // Include a list of alternative names in the results
        addressdetails: 0, // Include a breakdown of the address into elements
        'accept-language': 'en',
      });
      const url = `${GEOCODER_API}/search?${urlQuery}`;
      const response = await axios.get(url);
      const {lat, lon} = response.data.length ? response.data[0] : {} as any;

      statusLocation = {
        type: 'Point',
        coordinates: [lat, lon],
      };
    }

    const updatedCategory = new StatusCategoryEntity();
    const statusCategory = await this.statusCategoryRepository.findOne(status.categoryId);
    updatedCategory.id = statusCategory.id;
    updatedCategory.name = statusCategory.name;

    const updatedStatus = {
      ...status,
      location: statusLocation,
      category: updatedCategory,
    };

    await this.statusRepository.update(status.id, updatedStatus);

    return updatedStatus;
  }

  @Mutation(returns => StatusEntity)
  async deleteStatus(@Arg('statusId', () => ID) statusId: string): Promise<Partial<StatusEntity>> {

    await this.statusRepository.delete(statusId);

    return {id: statusId};
  }
}
