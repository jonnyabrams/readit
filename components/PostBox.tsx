import { useSession } from "next-auth/react";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";

import Avatar from "./Avatar";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreadit: string;
};

const PostBox = () => {
  const { data: session } = useSession();
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

        <PhotographIcon className={`h-6 text-gray-300 cursor-pointer`} />
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
              {...register("subreadit")}
              type="text"
              placeholder="eg. Everton FC"
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default PostBox;
