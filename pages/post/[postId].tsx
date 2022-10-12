import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import Post from "../../components/Post";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";

const PostPage = () => {
  const router = useRouter();
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      id: router.query.postId,
    },
  });

  const post: Post = data?.getPost;



  return (
    <div className="max-w-5xl mx-auto my-7">
      <Post post={post} />
    </div>
  );
};

export default PostPage;
