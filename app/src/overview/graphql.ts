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
  query StatusesInRadius(
    $radius: Float!, $latitude: Float!, $longitude: Float!, $skip: Boolean!, $cursor: String, $limit: Int
  ) {
    statusesInRadius(radius: $radius, latitude: $latitude, longitude: $longitude, cursor: $cursor, limit: $limit)
    @connection(key: "statusCursor", filter: ["radius", "latitude", "longitude"])
    @skip(if: $skip) {
      statuses {
        id
        createdAt
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
        statusLikes {
          id
          userId
        }
      }
      count
    }
  }
`;

export const addStatusMutation = gql`
  mutation AddStatus($status: StatusInput!) {
    addStatus(status: $status) {
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
      createdAt
    }
  }
`;

export const addStatusLikeMutation = gql`
  mutation AddStatusLike($like: StatusLikeInput!) {
    addStatusLike(like: $like) {
      id
    }
  }
`;

export const removeStatusLikeMutation = gql`
  mutation RemoveStatusLike($like: StatusLikeInput!) {
    removeStatusLike(like: $like) {
      statusId
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
