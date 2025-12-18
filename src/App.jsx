import { Dock, Navbar, Welcome } from "@components";
import {
  Contact,
  Finder,
  Image,
  Resume,
  Safari,
  Terminal,
  Text,
} from "@windows";
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
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
    </main>
  );
}

export default App;
