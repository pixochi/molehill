import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Args,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import axios from 'axios';

import StatusEntity from 'src/entity/status';
import UserEntity from 'src/entity/user';
import { buildUrlQuery } from 'src/graphql/helpers/url-query-builder';

import { StatusInput, StatusesInRadiusArgs, StatusesInRadiusWithCount } from './types';
import { GEOCODER_API, BIG_INT_LIMIT } from '../constants';

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
  async allStatuses(): Promise<StatusEntity[]> {
    return await this.statusRepository.find();
  }

  @Query((returns) => StatusesInRadiusWithCount)
  async statusesInRadius(@Args() { radius, latitude, longitude, limit, cursor }: StatusesInRadiusArgs): Promise<StatusesInRadiusWithCount> {

    const statusesWithUser = await this.statusRepository
      .createQueryBuilder('status')
      .leftJoinAndSelect('status.user', 'user')
      .where('ST_Distance_Sphere(location, ST_MakePoint(:latitude,:longitude)) <= :radius', {
        radius,
        latitude,
        longitude,
      })
      .andWhere(cursor ? `status.id > ${cursor}` : 'TRUE')
      .take(limit ? limit : BIG_INT_LIMIT)
      .getManyAndCount();

      return {
        statuses: statusesWithUser[0],
        count: statusesWithUser[1],
      };
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
    });

    return savedStatus;
  }
}
