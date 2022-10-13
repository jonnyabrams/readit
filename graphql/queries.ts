import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      body
      created_at
      id
      image
      title
      subreadit_id
      username
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreadit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
      }
    }
  }
`;

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      title
      subreadit_id
      username
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreadit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
      }
    }
  }
`;

export const GET_POST_BY_POST_ID = gql`
  query MyQuery($id: ID!) {
    getPost(id: $id) {
      body
      created_at
      id
      image
      title
      subreadit_id
      username
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreadit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
      }
    }
  }
`;

export const GET_SUBREADIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubreaditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GET_ALL_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`;
