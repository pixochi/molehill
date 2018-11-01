import React from 'react';
import { compose } from 'redux';
import { graphql } from 'react-apollo';

import Map from 'app/components/map/map';

import {statusesInRadius} from './graphql';

const Overview = (props: any) => {
  return (
    <>
      <Map />
    </>
  );
};

export default compose(
  graphql(statusesInRadius, {
    options: {
      variables: {
        radius: 50,
        latitude: 55,
        longitude: 66,
      },
    },
  }),
)(Overview);
