import { useSession } from "next-auth/react";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import Avatar from "./Avatar";
import { ADD_POST, ADD_SUBREADIT } from "../graphql/mutations";
import client from "../apollo-client";
import { GET_ALL_POSTS, GET_SUBREADIT_BY_TOPIC } from "../graphql/queries";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreadit: string;
};

type Props = {
  subreadit?: string;
};

const PostBox = ({ subreadit }: Props) => {
  const { data: session } = useSession();
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, "getPostList"],
  });
  const [addSubreadit] = useMutation(ADD_SUBREADIT);

  const [imageBoxOpen, setImageBoxOpen] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading("Creating new post...");

    try {
      // query for the subreadit topic
      const {
        data: { getSubreaditListByTopic },
      } = await client.query({
        query: GET_SUBREADIT_BY_TOPIC,
        variables: {
          topic: subreadit || formData.subreadit,
        },
      });

      const subreaditExists = getSubreaditListByTopic.length > 0;

      if (!subreaditExists) {
        // create this subreadit
        console.log("Subreddit is new! -> creating a new subreadit!");

        const {
          data: { insertSubreadit: newSubreadit },
        } = await addSubreadit({
          variables: {
            topic: formData.subreadit,
          },
        });

        console.log("Creating post...", formData);

        // make img an empty string because undefined image can throw an error
        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreadit_id: newSubreadit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("New post added:", newPost);
      } else {
        // use existing subreadit
        console.log("Using existing subreadit");
        console.log(getSubreaditListByTopic);

        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreadit_id: getSubreaditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });
        console.log("New post added:", newPost);
      }

      // Now reset fields
      setValue("postBody", "");
      setValue("postImage", "");
      setValue("postTitle", "");
      setValue("subreadit", "");

      toast.success("New post created!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        id: notification,
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky z-50 p-2 bg-white border border-gray-300 rounded-md top-20"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="flex-1 p-2 pl-5 rounded-md outline-none bg-gray-50"
          type="text"
          placeholder={
            session
              ? subreadit
                ? `Create a post in r/${subreadit}`
                : "Create a post by entering a title!"
              : "Sign in to post"
          }
        />

        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="flex-1 p-2 m-2 outline-none bg-blue-50"
              {...register("postBody")}
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          {!subreadit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreadit:</p>
              <input
                className="flex-1 p-2 m-2 outline-none bg-blue-50"
                {...register("subreadit", { required: true })}
                type="text"
                placeholder="eg. Everton FC"
              />
            </div>
          )}

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                className="flex-1 p-2 m-2 outline-none bg-blue-50"
                {...register("postImage")}
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="p-2 space-y-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>- A post title is required</p>
              )}

              {errors.subreadit?.type === "required" && (
                <p>- A subreadit is required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-400 rounded-full"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default PostBox;
