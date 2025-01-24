import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="m-3 flex justify-center">
      <div className="w-full sm:w-[85%] shadow-md px-5 py-10">
        <Outlet />
      </div>
    </div>
  );
}
