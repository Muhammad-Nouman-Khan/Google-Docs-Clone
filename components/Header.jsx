"use client";
import { auth } from "@/firebase";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 justify-between shadow-md bg-white">
      <div className="flex items-center">
        <Image src="/menu.svg" alt="menu" width={30} height={30} />
        <Image
          className="ml-5"
          src="/logo.png"
          alt="Google Docs"
          width={50}
          height={30}
        />

        <h1 className="ml-2 text-gray-500 text-2xl font-semibold">Docs</h1>
      </div>
      <div className="hidden md:flex mx-5 md:mx-20 flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:shadow-md focus-within:bg-white">
        <Image src="/search.svg" height={30} width={30} />
        <input
          className="text-base bg-transparent outline-none flex-grow px-5"
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="flex items-center justify-center gap-5">
        <Image
          className="md:hidden flex"
          src="/search.svg"
          height={30}
          width={30}
        />
        <Image src="/apps.svg" height={30} width={30} />
        <img
          onClick={() => signOut(auth)}
          src={user?.photoURL}
          className="h-10 w-10 rounded-full cursor-pointer ml-2"
          loading="lazy"
          alt=""
        />
      </div>
    </header>
  );
};

export default Header;
