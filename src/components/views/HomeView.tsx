import { useState, useContext } from "react";
import { GlobalContext, Preview } from "@/context/GlobalContext";

const HomeView = () => {
  const [focusPreview, setFocusPreview] = useState<Preview | null>(null);
  const { previews, setPreviews } = useContext(GlobalContext);

  const updatePreviewNameHandler = (preview: Preview, name: string) => {
    const updatedPreviews = previews.map((p) => ({
      ...p,
      name: p.id === preview.id ? name : p.name,
    }));

    setPreviews(updatedPreviews);
  };

  return (
    <div className="overflow-y-auto">
      {previews.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl">No Photos</div>
        </div>
      ) : (
        previews.map((preview: Preview) => (
          <div
            onClick={() => setFocusPreview(preview)}
            className={[
              "flex my-2 p-1 w-full",
              preview.id === focusPreview?.id &&
                "outline-dotted outline-2 outline-gray-200",
            ].join(" ")}
            key={preview.id}
          >
            <img
              className="w-24 rounded-md"
              src={preview.photo}
              alt="preview"
            />
            <input
              className="my-auto mx-2 px-2 w-full h-12 outline-none focus:outline-none font-bold"
              onClick={(e: any) => e.target.select()}
              onChange={(e) =>
                updatePreviewNameHandler(preview, e.target.value)
              }
              onKeyUp={(e: any) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  e.target.blur();
                }
              }}
              type="text"
              value={preview.name}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default HomeView;
