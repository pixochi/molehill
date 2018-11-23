import { DataProps } from 'react-apollo';
import { StatusesInRadius, StatusesInRadiusVariables } from 'app/generated/graphql';

export type StatusesInRadiusData = DataProps<StatusesInRadius, StatusesInRadiusVariables>;
