import { useContext } from "react";
import { GlobalContext, Preview } from "@/context/GlobalContext";

const PreviewView = () => {
  const { previews, setPreviews } = useContext(GlobalContext);

  const updatePreviewHandler = (preview: Preview) => {
    const updatedPreviews = previews.map((p) => ({
      ...p,
      selected: p.id === preview.id ? !p.selected : p.selected,
    }));

    setPreviews(updatedPreviews);
  };

  return (
    <div className="grid grid-flow-row grid-cols-3">
      {previews.map((preview: Preview) => (
        <div
          key={preview.id}
          onClick={() => updatePreviewHandler(preview)}
          className={[
            "col-span-1 flex bg-gray-700 rounded",
            preview.selected ? "m-1" : "m-2",
          ].join(" ")}
        >
          <div className="relative">
            <img
              className={["rounded", preview.selected && "p-1"].join(" ")}
              src={preview.photo}
              alt="preview"
            />
            <div className="absolute bottom-1 bg-gray-700 text-sm opacity-70 font-bold text-white w-full flex justify-center">
              {preview.tag}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviewView;
