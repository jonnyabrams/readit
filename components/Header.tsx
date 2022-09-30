import Image from "next/image";

import { HomeIcon, ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
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

      <form className="flex items-center flex-1 px-3 py-1 space-x-2 bg-gray-100 border border-gray-200 rounded-sm">
        <SearchIcon className="w-6 h-6 text-gray-400" />
        <input className="flex-1 bg-transparent outline-none" type="text" placeholder="Search Readit" />
        <button type="submit" hidden />
      </form>
    </div>
  );
};

export default Header;
