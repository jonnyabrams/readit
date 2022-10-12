import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

import Post from "../../components/Post";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";

type FormData = {
  comment: string;
};

const PostPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      id: router.query.postId,
    },
  });

  const post: Post = data?.getPost;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-5xl mx-auto my-7">
      <Post post={post} />

      <div className="p-5 pl-16 -mt-1 bg-white border border-t-0 border-gray-300 rounded-b-md">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <textarea
            {...register("comment")}
            disabled={!session}
            className="h-24 p-2 pl-4 border border-gray-200 rounded-md outline-none disabled:bg-gray-50"
            placeholder={
              session ? "What are your thoughts?" : "Please sign in to comment"
            }
          />

          <button
            type="submit"
            className="p-3 font-semibold text-white bg-red-500 rounded-full disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostPage;
