import { useSession } from "next-auth/react";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Avatar from "./Avatar";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreadit: string;
};

const PostBox = () => {
  const { data: session } = useSession();
  const [imageBoxOpen, setImageBoxOpen] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form className="sticky z-50 p-2 bg-white border border-gray-300 rounded-md top-16">
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="flex-1 p-2 pl-5 rounded-md outline-none bg-gray-50"
          type="text"
          placeholder={
            session ? "Create a post by entering a title!" : "Sign in to post"
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

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreadit:</p>
            <input
              className="flex-1 p-2 m-2 outline-none bg-blue-50"
              {...register("subreadit", { required: true })}
              type="text"
              placeholder="eg. Everton FC"
            />
          </div>

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
                <p>A post title is required</p>
              )}
              
              {errors.subreadit?.type === "required" && (
                <p>A subreadit is required</p>
              )}
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default PostBox;
