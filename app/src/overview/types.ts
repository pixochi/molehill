import { Point } from 'geojson';
import { DataProps } from 'react-apollo';

export interface IStatusResponse {
  id: string;
  title: string;
  location: Point;
  city: string;
  zipCode: string;
  street: string;
  user: {
    id: string;
    username: string;
  };
  description?: string;
}

export type StatusesInRadiusData = DataProps<{statusesInRadius: IStatusResponse[]}>;
