import { Dock, Navbar, Welcome } from "@components";
import { Safari, Terminal } from "@windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
    </main>
  );
}

export default App;
