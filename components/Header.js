import Image from "next/image";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase-config";
import Login from "./login";

export default function Header({ user, login, setLogin, setUser }) {
  return (
    <div className="w-full mt-5 rounded-xl h-80 col-span-1 font-medium flex flex-col items-center ">
      {!login ? (
        <>
          <Link href="/">
            <a className="w-full rounded-lg hover:bg-blue-700 p-4">Home</a>
          </Link>
          <Login
            setLogin={setLogin}
            setUser={setUser}
            user={user}
            login={login}
          />
        </>
      ) : (
        <div className="space-y-4 flex flex-col">
          <div className="flex">
            <Image
              src={user.photoURL}
              alt="pp"
              width="50"
              height="50"
              className="rounded-full"
            />
            <div className="flex-col pl-4">
              <p>{user.displayName}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <Link href="/">
            <a className="w-full rounded-lg hover:bg-blue-700 p-4">Home</a>
          </Link>
          <button
            className="text-red-700 border-2 border-red-700 px-2 hover:bg-red-700 hover:text-white ease transition-all"
            onClick={() => {
              signOut(auth)
                .then(() => {
                  setLogin(false);
                  setUser([]);
                })
                .catch((err) => alert(err));
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
