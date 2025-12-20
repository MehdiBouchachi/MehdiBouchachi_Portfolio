import { WindowControls } from "@components";
import { techStack } from "@constants";
import WindowWrapper from "@hoc/WindowWrapper";
import { Check, Flag } from "lucide-react";

function Terminal() {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Tech Stack</h2>
      </div>
      <div className="techstack">
        <p>
          <span className="font-bold">@Mehdi % show tech stack</span>
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technology</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li className="flex" key={category}>
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {item} {i < item.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="footnote">
          <p>
            <Check size={20} /> 5 of 5 stacks loaded successfully.
          </p>
          <p className="text-black">
            <Flag size={15} fill="black" /> Render time: 23ms
          </p>
        </div>
      </div>
    </>
  );
}
const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;
