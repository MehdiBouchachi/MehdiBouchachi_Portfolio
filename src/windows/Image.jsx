import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";

function Image() {
  const { windows } = useWindowStore();
  const data = windows?.imgfile.data;
  if (!data) return;
  const { name, imageUrl } = data;
  return (
    <>
      <div id="window-header">
        <WindowControls target={"imgfile"} />
        <h2>{name}</h2>
      </div>
      <div className="p-5 space-y-6 bg-white">
        {imageUrl && (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
          </div>
        )}
      </div>
    </>
  );
}

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;
