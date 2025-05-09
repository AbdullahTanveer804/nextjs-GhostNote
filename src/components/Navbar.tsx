
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="p-4 md:p-4 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#">
          <div className="flex justify-center ">
            <img src="/logo2.png" alt="Google" className="h-12" />
          </div>
        </a>
        {session ? (
          <>
            <span className="mr-4">Welcome, {user.username || user.email}</span>
            <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>Logout</Button>
          </>
        ) : (
          <>
          <span className="mr-32">Express Without Stress – GhostNote Awaits!</span>
          <Link href="/log-in">
            <Button onClick={() => {}} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>Login</Button>
          </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
