import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {
  return (
    <div
      style={{ height: "100dvh" }}
      className="flex absolute top-0 left-0 w-full bg-white"
    >
      <div className="m-auto">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl" />
      </div>
    </div>
  );
};

export default Login;
