import { Outlet } from "react-router-dom";
import HeaderNavbar from "./components/header-navbar";

function Client() {
  return (
    <div>
      <HeaderNavbar />
      <div className="m-3 flex justify-center">
        <div className="w-full sm:w-[85%] shadow-md px-5 py-10 min-h-dvh">
          <Outlet />
        </div>
      </div>
      <footer>
        <p className="bg-slate-800 p-10 text-sm text-white text-center">
          Builded with love by Nurhamsah 2025
        </p>
      </footer>
    </div>
  );
}

export default Client;
