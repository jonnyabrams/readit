import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation MyMutation(
    $body: String!
    $image: String!
    $subreadit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      $body: $body
      $image: $image
      $subreadit_id: $$subreadit_id
      $title: $title
      $username: $username
    ) {
      body 
      created_at 
      id 
      image 
      subreadit_id 
      title 
      username 
    }
  }
`;

export const ADD_SUBREADIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubreadit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`