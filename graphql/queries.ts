import { gql } from "@apollo/client";

export const GET_SUBREADIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubreaditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;
