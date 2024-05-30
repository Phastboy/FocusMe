import { SignInButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to FocusMe</h1>
      <p className="text-xl mb-4">Your ultimate task management tool</p>
      <SignInButton mode="modal">
        <button className="px-6 py-2 bg-blue-500 text-white rounded">
          Get Started
        </button>
      </SignInButton>
    </div>
  );
}
