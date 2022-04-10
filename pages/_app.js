import { useState } from "react";
import Header from "../components/Header";
import Top from "../components/Top";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState([]);
  const [login, setLogin] = useState(false);
  return (
    <div className="container mx-auto lg:px-10 text-gray-50 w-full h-full">
      <div className="grid grid-cols-5 gap-8">
        <Header
          user={user}
          login={login}
          setLogin={setLogin}
          setUser={setUser}
        />
        <div className="w-full feed col-span-3 border-gray-200 border-x-2">
          <Component
            {...pageProps}
            user={user}
            setUser={setUser}
            login={login}
            setLogin={setLogin}
          />
        </div>
        <Top />
      </div>
    </div>
  );
}

export default MyApp;
