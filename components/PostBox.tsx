import { useSession } from "next-auth/react";
import Avatar from "./Avatar";

const PostBox = () => {
  const { data: session } = useSession();

  return (
    <form>
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
      </div>
    </form>
  );
};

export default PostBox;
