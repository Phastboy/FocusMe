import React from "react";
import CreateTaskFormButton from "@/components/ui/createTaskFormButton";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center fixed w-full z-10">
        <nav className="flex space-x-4">
          <Link href="/dashboard" className="hover:underline">
            Home
          </Link>
          <Link href="/tasks" className="hover:underline">
            Tasks
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
        <CreateTaskFormButton />
      </header>
      <main className="flex-1 p-4 mt-16">{children}</main>
    </div>
  );
};

export default Layout;
