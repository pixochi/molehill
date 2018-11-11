import { RouteComponentProps, match } from 'react-router-dom';

interface IComputedMatch<Params extends { [K in keyof Params]?: string } = {}> {
  computedMatch: match<Params>;
}

export type RouteComponentProps<Params extends { [K in keyof Params]?: string } = {}> =
  RouteComponentProps<Params> & IComputedMatch<Params>;
