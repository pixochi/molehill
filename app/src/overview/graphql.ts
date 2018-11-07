import gql from 'graphql-tag';

export const allStatuses = gql`
  query allStatuses {
    allStatuses {
      id
      location {
        type
        coordinates
      }
      title
    }
  }
`;

export const statusesInRadius = gql`
  query statusesInRadius($radius: Float!, $latitude: Float!, $longitude: Float!) {
    statusesInRadius(radius: $radius, latitude: $latitude, longitude: $longitude) {
      id
      location {
        type
        coordinates
      }
      title
    }
  }
`;

export const addStatusMutation = gql`
  mutation addStatus($status: StatusInput!) {
    addStatus(status: $status) {
      id
    }
  }
`;

export const geocodeReverse = gql`
  query geocodeReverse($latitude: Float!, $longitude: Float!) {
    geocodeReverse(latitude: $latitude, longitude: $longitude) {
      address {
        country
        city
        suburb
        postcode
        road
        houseNumber
      }
    }
  }
`;
