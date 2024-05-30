import { SignedIn, UserButton } from "@clerk/nextjs";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <Header /> */}
      <div>{children}</div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
