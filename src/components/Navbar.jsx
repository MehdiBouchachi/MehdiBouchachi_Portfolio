import dayjs from "dayjs";
import { navIcons, navLinks } from "@constants";
import useWindowStore from "@store/window";
function Navbar() {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      {/* Left Section */}
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Mehdi's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => {
            return (
              <li key={id} onClick={() => openWindow(type)}>
                <p>{name}</p>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Right Section */}

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} />
            </li>
          ))}
        </ul>
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
}

export default Navbar;
