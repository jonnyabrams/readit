import { useSession } from "next-auth/react";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";

import Avatar from "./Avatar";

const PostBox = () => {
  const { data: session } = useSession();

  return (
    <form className="sticky z-50 p-2 bg-white border border-gray-300 rounded-md top-16">
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
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
    </form>
  );
};

export default PostBox;
