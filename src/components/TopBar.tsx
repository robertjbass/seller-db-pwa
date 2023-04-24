import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

const TopBar = () => {
  const { user, logOut } = useContext(GlobalContext);
  return (
    <nav
      className={`h-16 fixed top-0 left-0 w-full border-b-2 z-10 p-4 flex justify-between bg-white`}
    >
      <div className="flex">
        {user ? (
          <span className="my-auto">Hello {user.displayName}</span>
        ) : (
          <span className="my-auto">Not signed in</span>
        )}
      </div>
      <button className="flex" onClick={logOut}>
        <span className="my-auto">Log Out</span>
      </button>
    </nav>
  );
};

export default TopBar;
