import React, { useEffect } from "react";
import { auth, provider } from "../lib/firebase-config";
import { signInWithPopup } from "firebase/auth";

function Login({ user, setUser, login, setLogin }) {
  useEffect(() => {
    //console.log(login);
  }, [user, login]);

  if (login)
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col space-y-4">
        <h1 className="font-medium text-3xl">You Are Already Signed In. </h1>
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
    );

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <button
        id="google"
        className="border-2 border-indigo-500 p-2 shadow-xl rounded-xl"
        onClick={() => {
          signInWithPopup(auth, provider)
            .then((res) => {
              setUser(res.user);
              setLogin(true);
            })
            .catch((err) => {
              alert("Error!!" + err);
              setLogin(false);
              setUser([]);
            });
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
