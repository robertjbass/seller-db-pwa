import { useContext } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { GlobalContext } from "@/context/GlobalContext";

const HomeFooter = () => {
  const { setView, previews } = useContext(GlobalContext);
  return (
    <div className="flex w-full justify-between">
      <button
        className="border-2 w-8 h-8 flex rounded-full"
        onClick={() => setView("camera")}
      >
        <AiOutlineCamera className="m-auto" />
      </button>
      <button
        className={`select-none border-2 w-8 h-8 flex rounded-full`}
        onClick={() => setView("preview")}
      >
        <div className="m-auto">{previews.length}</div>
      </button>
    </div>
  );
};

export default HomeFooter;
