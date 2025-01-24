import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

function NotFound() {
  const nav = useNavigate();
  return (
    <div className="h-dvh w-full justify-center items-center flex">
      <div className=" text-center">
        <p className="text-2xl font-bold text-gray-600">Upps, Page Not Found</p>
        <p className="text-sm  text-gray-500">check your URL path</p>
        <Button className="mt-4" onClick={() => nav("/")}>
          Back To Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
