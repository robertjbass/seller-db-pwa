import { useState, useEffect, useContext, useRef } from "react";
import TopBar from "@/components/TopBar";
import { GlobalContext } from "@/context/GlobalContext";
import PreviewFooter from "@/components/footers/PreviewFooter";
import HomeFooter from "@/components/footers/HomeFooter";
import PreviewView from "@/components/views/PreviewView";
import HomeView from "@/components/views/HomeView";
import cameraClick from "@/assets/camera-click.wav";
import { BsChevronLeft } from "react-icons/bs";
const cameraAudio = new Audio(cameraClick);

const App = () => {
  const viewRef = useRef<any>(null);

  const [cameraButtonColor, setCameraButtonColor] = useState("bg-white");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { previews, view, setView, setSelectedPreviews, setPreviews } =
    useContext(GlobalContext);

  useEffect(() => {
    const newPreviews = previews.filter((preview) => preview.selected);
    setSelectedPreviews(newPreviews);
  }, [previews]);

  useEffect(() => {
    if (view === "camera") {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        })
        .then((mediaStream) => {
          setStream(mediaStream);
          viewRef.current.srcObject = mediaStream;
          viewRef.current.play();
        })
        .catch((error: any) => {
          console.error("Error accessing camera:", error);
        });
    } else {
      if (stream) {
        stream.getTracks().forEach((track: any) => track.stop());
        setStream(null);
      }
    }
  }, [view]);

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
      setPreviews([
        ...previews,
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

  // const View = () => {}

  return (
    <>
      <TopBar />

      <div className="absolute top-0 py-20 px-4 overflow-y z-5 w-full">
        {view === "camera" ? (
          <div className="w-full h-full flex flex-col justify-between">
            <video className="rounded" ref={viewRef} />
          </div>
        ) : view === "preview" ? (
          <PreviewView />
        ) : (
          <HomeView />
        )}
      </div>

      <div
        className={`h-16 fixed bottom-0 left-0 w-full border-t-2 z-10 p-4 flex justify-between bg-white`}
      >
        <div className="flex justify-between w-full">
          {view === "camera" ? (
            <div className="flex w-full justify-between">
              <button
                className="border-2 w-8 h-8 flex rounded-full"
                onClick={() => setView("home")}
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
          ) : view === "preview" ? (
            <PreviewFooter />
          ) : (
            <HomeFooter />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
