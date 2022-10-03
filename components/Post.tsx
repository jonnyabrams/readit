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
import TimeAgo from "react-timeago";

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
        <div className="flex items-center space-x-2">
          <Avatar seed={post.subreadit[0]?.topic} />
          <p className="text-xs text-gray-400">
            <span className="font-bold text-black hover:text-blue-400 hover:underline">r/{post.subreadit[0]?.topic}</span> · Posted by u/
            {post.username} <TimeAgo date={post.created_at} />
          </p>
        </div>

        {/* Body  */}
        <div className="py-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-sm font-light">{post.body}</p>
        </div>

        {/* Image  */}

        {/* Footer */}
      </div>
    </div>
  );
};

export default Post;
