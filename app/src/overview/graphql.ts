import gql from 'graphql-tag';

export const allStatuses = gql`
  query AllStatuses {
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
  query StatusesInRadius($radius: Float!, $latitude: Float!, $longitude: Float!, $skip: Boolean!) {
    statusesInRadius(radius: $radius, latitude: $latitude, longitude: $longitude) @skip(if: $skip) {
      id
      location {
        type
        coordinates
      }
      city
      zipCode
      street
      title
      description
      user {
        id
        username
        image
      }
    }
  }
`;

export const addStatusMutation = gql`
  mutation AddStatus($status: StatusInput!) {
    addStatus(status: $status) {
      id
    }
  }
`;

export const geocodeReverse = gql`
  query GeocodeReverse($latitude: Float!, $longitude: Float!) {
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
