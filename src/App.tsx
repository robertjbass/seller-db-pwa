import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

const navbarColor = "bg-white";

const App = () => {
  const { user } = useContext(GlobalContext);

  return (
    <div>
      <div
        className={`h-16 fixed top-0 left-0 w-full border-b-2 z-10 p-4 ${navbarColor}`}
      >
        {user ? <h1>Hello {user.displayName}</h1> : <h1>Not signed in</h1>}
      </div>
      <div className="absolute top-0 py-20 px-4 overflow-y z-5">
        {new Array(40).fill("stuff").map((item, i) => (
          <h2 key={i}>{item}</h2>
        ))}
      </div>
      <div
        className={`h-16 fixed bottom-0 left-0 w-full border-t-2 z-10 p-4 ${navbarColor}`}
      >
        {user ? <h1>Hello {user.displayName}</h1> : <h1>Not signed in</h1>}
      </div>
    </div>
  );
};

export default App;
