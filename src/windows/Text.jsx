import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";

function Text() {
  const { windows } = useWindowStore();
  const data = windows?.txtfile.data;
  if (!data) return;
  const { name, image, subtitle, description } = data;
  return (
    <>
      <div id="window-header">
        <WindowControls target={"txtfile"} />
        <h2>{name}</h2>
      </div>
      <div className="p-5 space-y-6 bg-white">
        {image && (
          <div className="w-full">
            <img src={image} alt={name} className="w-full rounded" />
          </div>
        )}
        {subtitle && <h3 className="text-lg font-semibold">{subtitle}</h3>}
        {description && (
          <div className="space-y-3 leading-relaxed text-base text-gray-800">
            {description?.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
