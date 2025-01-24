import { profile, useAtom } from "@/store/store";
import { Button } from "./ui/button";
import useMutationPost from "@/hooks/useMutationPost";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function HeaderNavbar() {
  const [profileData] = useAtom(profile);
  const cookie = new Cookies();
  const nav = useNavigate();
  const mutation = useMutationPost({
    api: "/logout",
    /// IF INVALIDATE HAS "_none " WHICH MEAN IS DISABLED INVALIDATE
    invalidateKey: "/logout_none",
    afterSuccess: () => {
      cookie.remove("access_token", { path: "/" });
      nav("/login");
    },
  });
  return (
    <div className="bg-slate-700 p-3 sticky top-0 z-40 flex justify-center">
      <div className="flex items-center justify-between  w-full sm:w-[85%]">
        <p className="text-white capitalize font-bold max-w-28 sm:max-w-full overflow-hidden text-ellipsis">
          {profileData.name}
        </p>
        <div className=" gap-5 flex">
          <Button
            onClick={() => nav("/")}
            variant="ghost"
            className="text-white text-sm"
            size="sm"
          >
            My course
          </Button>
          <Button
            onClick={() => mutation.mutate({})}
            variant="ghost"
            disabled={mutation.isPending}
            className="text-white text-sm bg-red-500 hover:bg-red-600"
            size="sm"
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeaderNavbar;
