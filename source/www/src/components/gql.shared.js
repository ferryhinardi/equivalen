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
      assignment {
        deadline
      }
      curriculum {
        name
      }
      questionType {
        name
      }
      packages {
        id
        name
        totalQuestion
      }
      createdAt
    }
  }
`;

export const QUERY_GET_ARCHIVES_BY_USER = gql`
  query getArchiveByUser(
    $limit: Int
    $offset: Int
    $userId: ID
    $evaluationId: ID
  ) {
    archiveByUser(
      limit: $limit
      offset: $offset
      userId: $userId
      evaluationId: $evaluationId
    ) {
      opened
      archive {
        id
        name
        assignment {
          deadline
        }
      }
    }
  }
`;

export const QUERY_GET_VIDEO_TUTORIAL = gql`
  query getVideoTutorials (
    $limit: Int
    $offset: Int
    $courseId: ID
  ) {
    videoTutorials(
      limit: $limit
      offset: $offset
      courseId: $courseId
    ) {
      id
      url
    }
  }
`;

export const MUTATION_VERIFICATION_EMAIL = gql`
  mutation VerificationEmail($email: String) {
    verificationEmail(email: $email) {
      token
    }
  }
`;

export const QUERY_GET_USER_RELATIONSHIP = gql`
  query getUserRelationship (
    $user: UserInput
    $target: TargetRelationInput
    $status: UserRelationshipStatusInput
    $type: UserRelationshipTypeInput
    $limit: Int
    $offset: Int
  ) {
    userRelationships(
      user: $user
      target: $target
      status: $status
      type: $type
      limit: $limit
      offset: $offset
    ) {
      id
      user {
        id
        fullName
      }
      target {
        user {
          id
          fullName
        }
        class {
          id
          name
          grade {
            name
          }
        }
      }
      status {
        name
      }
    }
  }
`;
