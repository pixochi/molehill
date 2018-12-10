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

export const allCategories = gql`
  query AllCategories {
    allCategories {
      id
      name
    }
  }
`;

export const statusFragment = gql`
  fragment StatusFragment on StatusEntityWithAttendanceCount {
    id
    createdAt
    location {
      type
      coordinates
    }
    country
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
      count
    }
    category {
      id
      name
    }
    attendance
  }
`;

export const statusesInRadius = gql`
  query StatusesInRadius(
    $radius: Float!, $categoryIds: [ID!], $latitude: Float!, $longitude: Float!,
    $skip: Boolean!, $cursor: String, $limit: Int,
  ) {
    statusesInRadius(radius: $radius, categoryIds: $categoryIds, latitude: $latitude, longitude: $longitude,
    cursor: $cursor, limit: $limit)
    @connection(key: "statusCursor", filter: ["radius", "latitude", "longitude", "categoryIds"])
    @skip(if: $skip) {
      statuses {
        ...StatusFragment
      }
      count
    }
  }
  ${statusFragment}
`;

export const addStatusMutation = gql`
  mutation AddStatus($status: StatusInput!) {
    addStatus(status: $status) {
      id
      location {
        type
        coordinates
      }
      country
      city
      zipCode
      street
      title
      description
      createdAt
      category {
        id
        name
      }
    }
  }
`;

export const editStatusMutation = gql`
  mutation EditStatus($status: EditStatusInput!) {
    editStatus(status: $status) {
      id
      category {
        id
        name
      }
      location {
        type
        coordinates
      }
      country
      city
      zipCode
      street
      title
      description
    }
  }
`;

export const deletetatusMutation = gql`
  mutation DeleteStatus($statusId: String!) {
    deleteStatus(statusId: $statusId) {
      id
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
  mutation RemoveStatusLike($id: String!) {
    removeStatusLike(id: $id) {
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
