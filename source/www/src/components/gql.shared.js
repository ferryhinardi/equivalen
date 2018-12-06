import gql from 'graphql-tag';

export const QUERY_GET_PROVINCE = gql`
  query getProvinces {
    provinces {
      id
      name
    }
  }
`;

export const QUERY_GET_CITY = gql`
  query getCities ($provinceId: ID) {
    cities(provinceId: $provinceId) {
      id
      name
    }
  }
`;

export const QUERY_GET_DISTRICT = gql`
  query getDistricts ($cityId: ID) {
    districts(cityId: $cityId) {
      id
      name
    }
  }
`;

export const QUERY_GET_COURSE = gql`
  query getCourses {
    courses {
      id
      name
    }
  }
`;

export const QUERY_GET_SCHOOL = gql`
  query getSchools {
    schools {
      id
      name
      province {
        id
        name
      }
      city {
        id
        name
      }
      district {
        id
        name
      }
    }
  }
`;

export const QUERY_GET_ARCHIVES = gql`
  query getArchives(
    $limit: Int
    $offset: Int
    $evaluation: EvaluationInput
    $createdBy: UserInput
  ) {
    archives(
      limit: $limit
      offset: $offset
      evaluation: $evaluation
      createdBy: $createdBy
    ) {
      id
      name
      evaluation {
        type
      }
      curriculum {
        name
      }
      questionType {
        name
      }
      packages {
        name
        totalQuestion
      }
      createdAt
    }
  }
`;
