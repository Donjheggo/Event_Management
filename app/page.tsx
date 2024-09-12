import SignOutButton from "@/components/signout-button";

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <SignOutButton />
      </div>
    </main>
  );
}
