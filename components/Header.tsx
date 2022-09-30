import Image from "next/image";

import { HomeIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/outline";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex px-4 py-2 bg-white shadow-sm">
      <div className="relative flex-shrink-0 w-20 h-10 cursor-pointer">
        <Image objectFit="contain" src="/logo.jpeg" layout="fill" />
      </div>

      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="w-5 h-5" />
        <p className="flex-1 hidden ml-2 lg:inline">Home</p>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Header;
