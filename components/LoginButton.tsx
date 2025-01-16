import { signIn, signOut } from "@/auth";

export default async function LoginButton({ isLogin }: { isLogin: boolean }) {
  return !isLogin ? (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
      className="border border-blue-600 rounded p-1"
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  ) : (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="border border-blue-600 rounded p-1"
    >
      <button type="submit">Signout</button>
    </form>
  );
}
