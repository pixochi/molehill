import { DataProps } from 'react-apollo';

import { UserById } from 'app/generated/graphql';

export type UserData = DataProps<UserById>;
