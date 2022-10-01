import { useSession } from "next-auth/react";
import Image from "next/image";

const Avatar = () => {
  const { data: session } = useSession();

  return (
    <div className="relative w-10 h-10 bg-white border-gray-300 rounded-full">
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/open-peeps/${
          session?.user?.name || "placeholder"
        }.svg`}
        alt=""
      />
    </div>
  );
};

export default Avatar;
