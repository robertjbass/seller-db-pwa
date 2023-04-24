import { useState, useEffect, useRef } from "react";
import {
  AiOutlineCamera,
  AiOutlineSave,
  AiOutlineTag,
  AiOutlineTags,
  AiOutlineHighlight,
  AiFillHighlight,
} from "react-icons/ai";
import { BsChevronLeft, BsTrash } from "react-icons/bs";
import cameraClick from "@/assets/camera-click.wav";
import TopBar from "@/components/TopBar";

type Preview = {
  id: number;
  selected: boolean;
  name: string;
  photo: string;
  tag: string;
};
type CameraButtonColor = "bg-red-500" | "bg-white";

const App = () => {
  const navbarColor = "bg-white";
  const [stream, setStream] = useState<any>(null);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [view, setView] = useState<"home" | "camera" | "preview">("home");
  const [focusPreview, setFocusPreview] = useState<Preview | null>(null);
  const [selectedPreviews, setSelectedPreviews] = useState<Preview[]>([]);
  const [cameraButtonColor, setCameraButtonColor] =
    useState<CameraButtonColor>("bg-white");
  const viewRef = useRef<any>(null);
  const cameraAudio = new Audio(cameraClick);

  useEffect(() => {
    if (view !== "camera" && stream) {
      setStream(null);
      stream.getTracks().forEach((track: any) => track.stop());
      setStream(null);
    }
  }, [view]);

  useEffect(() => {
    const newPreviews = previews.filter((preview) => {
      return preview.selected;
    });

    setSelectedPreviews(newPreviews);
  }, [previews]);

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

  const toggleCameraHandler = async () => {
    if (view === "camera") {
      setView("home");
      if (viewRef?.current?.srcObject) {
        viewRef.current.srcObject = null;
      }
      return;
    }

    setView("camera");

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setStream(mediaStream);
      viewRef.current.srcObject = mediaStream;
      viewRef.current.play();
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleCaptureClick = () => {
    setCameraButtonColor("bg-red-500");
    cameraAudio.play();
    setTimeout(() => {
      setCameraButtonColor("bg-white");
    }, 200);

    const canvas = document.createElement("canvas");
    canvas.width = viewRef.current.videoWidth;
    canvas.height = viewRef.current.videoHeight;
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(viewRef.current, 0, 0, canvas.width, canvas.height);
      const photo = canvas.toDataURL("image/png");
      setPreviews((prev) => [
        ...prev,
        {
          id: Date.now(),
          selected: false,
          name: `photo_${previews.length + 1}`,
          photo,
          tag: "",
        },
      ]);
    }
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

  const CameraFooter = () => {
    return (
      <div className="flex w-full justify-between">
        <button
          className="border-2 w-8 h-8 flex rounded-full"
          onClick={toggleCameraHandler}
        >
          <BsChevronLeft className="m-auto" />
        </button>
        <button
          className={`select-none border-2 w-8 h-8 flex rounded-full ${cameraButtonColor}`}
          onClick={handleCaptureClick}
        >
          <div className="rounded-full w-6 h-6 border-2 m-auto"></div>
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

  const DefaultFooter = () => {
    return (
      <div className="flex w-full justify-between">
        <button
          className="border-2 w-8 h-8 flex rounded-full"
          onClick={toggleCameraHandler}
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

  const PreviewFooter = () => {
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

  const updatePreviewHandler = (preview: Preview) => {
    const updatedPreviews = previews.map((p) => ({
      ...p,
      selected: p.id === preview.id ? !p.selected : p.selected,
    }));

    setPreviews(updatedPreviews);
  };

  const updatePreviewNameHandler = (preview: Preview, name: string) => {
    const updatedPreviews = previews.map((p) => ({
      ...p,
      name: p.id === preview.id ? name : p.name,
    }));

    setPreviews(updatedPreviews);
  };

  return (
    <>
      <TopBar />

      <div className="absolute top-0 py-20 px-4 overflow-y z-5 w-full">
        {view === "camera" ? (
          <div className="w-full h-full flex flex-col justify-between">
            <video className="rounded" ref={viewRef} />
          </div>
        ) : view === "preview" ? (
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
        ) : (
          <div className="overflow-y-auto">
            {previews.length > 0 ? (
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
            ) : (
              <div className="flex flex-col justify-center items-center">
                <div className="text-2xl">No Photos</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={`h-16 fixed bottom-0 left-0 w-full border-t-2 z-10 p-4 flex justify-between ${navbarColor}`}
      >
        <div className="flex justify-between w-full">
          {view === "camera" ? (
            <CameraFooter />
          ) : view === "preview" ? (
            <PreviewFooter />
          ) : (
            <DefaultFooter />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
