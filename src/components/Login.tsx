import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/services/firebase";

const Login = () => {
  const { setUser, setGlobalLoading } = useContext(GlobalContext);

  const signInHandler = async () => {
    setGlobalLoading(true);
    const user = await signInWithGoogle();
    if (user) {
      setGlobalLoading(false);
      setUser(user);
    }
  };

  return (
    <div style={{ height: "100dvh" }} className="flex">
      <div className="m-auto">
        <button
          className="py-1 px-4 flex border-2 rounded-full"
          onClick={signInHandler}
        >
          <FcGoogle className="my-auto" />
          <span className="ml-2 my-auto text-xl">Login</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
