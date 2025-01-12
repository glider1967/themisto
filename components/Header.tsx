import { auth } from "@/auth";
import LoginButton from "./LoginButton";

export default async function Header() {
  const session = await auth();
  return (
    <div className="flex p-2">
      <div className="flex-1 text-2xl text-center font-bold inline-block align-middle">
        Shmool
      </div>
      <div className="flex-none inline-block align-middle text-sm p-2">
        Hello {session?.user?.name ?? "guest"}
      </div>
      <div className="flex-none">
        <LoginButton isLogin={session?.user !== undefined} />
      </div>
    </div>
  );
}
