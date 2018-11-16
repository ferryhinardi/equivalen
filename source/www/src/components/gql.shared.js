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
