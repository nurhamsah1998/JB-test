import { getInitialName, moneyCurrency } from "@/lib/utils";
import { profile, useAtom } from "@/store/store";
import { variantLevel } from "@/views/create-course/CreateCourse";
import { CourseType } from "@/views/Dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NavigateFunction } from "react-router-dom";
import DeleteCourse from "@/views/my-course/components/DeleteCourse";

function CardCourse({
  nav,
  item,
  isLoading,
}: {
  item: CourseType;
  isLoading?: boolean;
  nav: NavigateFunction;
}) {
  const [profileData] = useAtom(profile);
  const level = variantLevel?.find((vItem) => vItem?.name === item?.level);
  return (
    <div className="relative">
      <div
        onClick={() =>
          /// SEPERATE PATH BETWEEN CLIENT AND ADMIN
          nav(
            `${
              profileData.is_admin ? "/jb-admin/my-course/" : "/course/"
            }detail/${item.id}`
          )
        }
        className=" hover:shadow-md p-5 duration-200 cursor-pointer border-[1px] border-gray-200"
      >
        <div
          style={{
            backgroundImage: `url(http://localhost:8000/storage/${item?.thumbnail_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="rounded-md flex justify-center items-center bg-gray-300 h-36"
        >
          {!item?.thumbnail_path && (
            <p className="text-gray-500 font-extrabold">No Thumbnail</p>
          )}
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-1">
            <p className="bg-blue-300 text-xs text-blue-700 rounded-md px-2 py-0.5 w-fit">
              {item.category?.name}
            </p>
            <p className="bg-pink-300 text-xs text-pink-700 rounded-md px-2 py-0.5 w-fit">
              {item.program?.name}
            </p>
            <p className="bg-purple-300 text-xs text-purple-700 rounded-md px-2 py-0.5 w-fit">
              {level?.title}
            </p>
          </div>
          <p className=" text-2xl font-semibold">
            {!profileData.is_admin && item.price === 0 && !isLoading
              ? "FREE"
              : moneyCurrency(item?.price, "Rp")}
          </p>
          <p className=" text-xs text-slate-500 mt-1">
            {new Date(item.created_at).toLocaleString()}
          </p>
          <p className=" text-md font-semibold mt-3">{item.name}</p>
          <p className=" text-xs text-slate-700">{item.description}</p>
        </div>
        {!profileData.is_admin && (
          <div className="mt-5 flex gap-2">
            <Avatar className="bg-red-300">
              <AvatarFallback className=" uppercase">
                {getInitialName(item?.user?.name as unknown as string)}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <p className="font-semibold max-w-40 overflow-hidden text-ellipsis">
                {item?.user?.name}
              </p>
              <p className="text-gray-500 max-w-40 overflow-hidden text-ellipsis">
                {item?.user?.email}
              </p>
            </div>
          </div>
        )}
        {profileData.is_admin && <div className="h-10" />}
      </div>
      {profileData.is_admin && (
        <div className="mt-3 absolute z-10 bottom-5 right-5">
          <DeleteCourse courseId={item.id} />
        </div>
      )}
    </div>
  );
}

export default CardCourse;
