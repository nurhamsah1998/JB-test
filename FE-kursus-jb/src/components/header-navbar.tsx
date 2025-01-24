import { profile, useAtom } from "@/store/store";
import { Button } from "./ui/button";
import useMutationPost from "@/hooks/useMutationPost";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { CustomDialog } from "./dialog";

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
        {profileData.is_admin ? (
          <p className="text-white capitalize font-bold max-w-28 sm:max-w-full overflow-hidden text-ellipsis">
            {profileData.name}
          </p>
        ) : (
          <p
            onClick={() => nav("/")}
            className="text-white text-sm font-bold cursor-pointer"
          >
            Welcome To JB Course
          </p>
        )}

        <div className=" gap-5 flex items-center">
          {profileData.is_admin && (
            <Button
              onClick={() => nav("/jb-admin")}
              variant="ghost"
              className="text-white text-sm"
              size="sm"
            >
              My course
            </Button>
          )}

          {profileData.is_admin ? (
            <CustomDialog
              classNameButtonLabel="text-white text-sm bg-red-500 hover:bg-red-600"
              idCloseDialog="close-dialog-delete-course"
              disabledSubmit={mutation.isPending}
              onClickSubmit={() => mutation.mutate({})}
              buttonLabel="Log Out"
              size="sm"
              title="Log Out ?"
              labelSubmit="Log out"
              titleDesc="Are you sure want to log out ?"
            />
          ) : (
            <Button
              onClick={() => nav("/login")}
              variant="ghost"
              className="text-white text-sm"
              size="sm"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderNavbar;
{
  /* <Button
onClick={() => nav("/login")}
variant="ghost"
className="text-white text-sm"
size="sm"
>
Login
</Button> */
}
{
  /* <p className="text-white text-sm font-bold">Welcome To JB Course</p> */
}
