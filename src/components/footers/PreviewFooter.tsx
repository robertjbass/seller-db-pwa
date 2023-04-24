import { useContext } from "react";
import { BsChevronLeft, BsTrash } from "react-icons/bs";
import { GlobalContext } from "@/context/GlobalContext";
import {
  AiFillHighlight,
  AiOutlineHighlight,
  AiOutlineSave,
  AiOutlineTag,
  AiOutlineTags,
} from "react-icons/ai";

const PreviewFooter = () => {
  const { setView, selectedPreviews, previews, setPreviews } =
    useContext(GlobalContext);

  const deleteSelctedHandler = () => {
    const del = confirm("Are you sure you want to delete the selected photos?");

    if (!del) {
      return;
    }

    const newPreviews = previews.filter((preview) => {
      return !preview.selected;
    });
    setPreviews(newPreviews);
  };

  const tagSelectedHandler = () => {
    const tag = prompt("Please enter a tag name") || "";

    const newPreviews = previews.map((preview) => {
      if (preview.selected) {
        return { ...preview, tag };
      }
      return preview;
    });
    setPreviews(newPreviews);
  };

  const selectAll = () => {
    const newPreviews = previews.map((preview) => {
      return { ...preview, selected: true };
    });
    setPreviews(newPreviews);
  };

  const selectNone = () => {
    const newPreviews = previews.map((preview) => {
      return { ...preview, selected: false };
    });
    setPreviews(newPreviews);
  };

  return (
    <div className="flex w-full justify-between">
      <button
        className="border-2 w-8 h-8 flex rounded-full"
        onClick={() => setView("home")}
      >
        <BsChevronLeft className="m-auto" />
      </button>
      <button
        className="border-2 w-8 h-8 flex rounded-full"
        onClick={() =>
          selectedPreviews.length > 0 ? selectNone() : selectAll()
        }
      >
        {previews.length === 0 ? (
          <AiOutlineHighlight className="m-auto opacity-10 font-gray-50 hover:cursor-none" />
        ) : selectedPreviews.length > 0 ? (
          <AiOutlineHighlight className="m-auto" />
        ) : (
          <AiFillHighlight className="m-auto" />
        )}
      </button>
      <button
        className="border-2 w-8 h-8 flex rounded-full"
        disabled={selectedPreviews.length === 0}
        onClick={() => selectedPreviews.length > 0 && tagSelectedHandler()}
      >
        {selectedPreviews.length === 1 ? (
          <AiOutlineTag className="m-auto" />
        ) : selectedPreviews.length > 1 ? (
          <AiOutlineTags className="m-auto" />
        ) : (
          <AiOutlineTag className="m-auto opacity-10 font-gray-50 hover:cursor-none" />
        )}
      </button>
      <button
        disabled={selectedPreviews.length === 0}
        className="border-2 w-8 h-8 flex rounded-full"
        onClick={deleteSelctedHandler}
      >
        {selectedPreviews.length > 0 ? (
          <BsTrash className="m-auto" />
        ) : (
          <BsTrash className="m-auto opacity-10 font-gray-50 hover:cursor-none" />
        )}
      </button>
      <button
        disabled={previews.length === 0}
        className="border-2 w-8 h-8 flex rounded-full"
        onClick={() => {}}
      >
        {previews.length === 0 ? (
          <AiOutlineSave className="m-auto opacity-10 font-gray-50 hover:cursor-none" />
        ) : (
          <AiOutlineSave className="m-auto" />
        )}
      </button>
    </div>
  );
};

export default PreviewFooter;
