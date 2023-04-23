import { useEffect, useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { FcGoogle } from "react-icons/fc";
import { auth, signInWithGoogle } from "@/services/firebase";
import { getRedirectResult } from "firebase/auth";

const Login = () => {
  const { user, setUser, setGlobalLoading } = useContext(GlobalContext);

  useEffect(() => {
    if (!user) {
      try {
        getRedirectResult(auth)
          .then((result) => {
            if (result?.user) setUser(result.user);
          })
          .then(() => {
            setGlobalLoading(false);
          });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const signInHandler = async () => {
    setGlobalLoading(true);
    await signInWithGoogle();
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
