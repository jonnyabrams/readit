import React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import Avatar from "./Avatar";

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  return (
    <div className="flex bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:border hover:border-gray-600">
      {/* left-hand side showing votes */}
      <div className="flex flex-col items-center justify-start p-4 space-y-1 text-gray-400 rounded-l-md bg-gray-50">
        <ArrowUpIcon className="voteButtons hover:text-red-400" />
        <p className="text-xs font-bold text-black">0</p>
        <ArrowDownIcon className="voteButtons hover:text-blue-400" />
      </div>

      <div className="p-3 pb-1">
        {/* Header  */}
        <div>
          <Avatar seed={post.subreadit[0]?.topic} />
          <p>
            <span>r/{post.subreadit[0]?.topic}</span>
          </p>
        </div>

        {/* Body  */}

        {/* Image  */}

        {/* Footer */}
      </div>
    </div>
  );
};

export default Post;
