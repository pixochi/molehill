import { Point } from 'geojson';
import { DataProps } from 'react-apollo';

export interface IStatusResponse {
  id: string;
  userId: string;
  title: string;
  location: Point;
  city: string;
  zipCode: string;
  street: string;
  description?: string;
}

export type StatusesInRadiusData = DataProps<{statusesInRadius: IStatusResponse[]}>;
