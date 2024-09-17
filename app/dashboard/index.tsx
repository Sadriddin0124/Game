import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn("google")}>Google orqali kirish</button>
      ) : (
        <div>
          <p>Salom, {session.user?.name}</p>
          <button onClick={() => signOut()}>Chiqish</button>
        </div>
      )}
    </div>
  );
}
