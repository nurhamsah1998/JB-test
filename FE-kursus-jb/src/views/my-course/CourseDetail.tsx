import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import { CreateMaterial } from "./components/CreateMaterial";
import { variantLevel } from "../create-course/CreateCourse";
import { CourseType } from "../Dashboard";
import EmptyMessage from "@/components/empty-message";
import DeleteMaterial from "./components/DeleteMaterial";
import { profile, useAtom } from "@/store/store";
import { moneyCurrency } from "@/lib/utils";

function CourseDetail() {
  const { id } = useParams();
  const [profileData] = useAtom(profile);
  const {
    items,
    isLoading,
    isRefetching,
  }: { items: CourseType; isLoading: boolean; isRefetching: boolean } =
    useFetch({
      api: `/my-course/${id}`,
      invalidateKey: `/my-course/${id}`,
      staleTime: 1,
      enabled: Boolean(id),
    });
  const level = variantLevel?.find((vItem) => vItem?.name === items?.level);
  return (
    <div>
      <div>
        <div
          style={{
            backgroundImage: `url(http://localhost:8000/storage/${items?.thumbnail_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className={`rounded-md flex justify-center items-center h-64 ${
            isLoading ? "animate-pulse bg-gray-500" : "bg-gray-300"
          }`}
        >
          {!items?.thumbnail_path && !isLoading && (
            <p className="text-gray-500 font-extrabold">No Thumbnail</p>
          )}
        </div>
        <div className="mt-3 ">
          <div className="flex items-center gap-1">
            <p className="bg-blue-300 text-xs text-blue-700 rounded-md px-2 py-0.5 w-fit">
              {items?.category?.name}
            </p>
            <p className="bg-pink-300 text-xs text-pink-700 rounded-md px-2 py-0.5 w-fit">
              {items?.program?.name}
            </p>
            <p className="bg-purple-300 text-xs text-purple-700 rounded-md px-2 py-0.5 w-fit">
              {level?.title}
            </p>
          </div>
          <p className=" text-2xl font-semibold">
            {moneyCurrency(items?.price, "Rp")}
          </p>
          <p className=" text-md font-semibold mt-3">{items?.name}</p>
          <p className=" text-xs text-slate-700">{items?.description}</p>
        </div>
      </div>
      <div>
        <div className=" ">
          <div className="h-[1px] w-full bg-gray-300 mt-5 mb-2" />
          <div className="flex justify-between items-center mt-5">
            <p className="text-xs font-bold text-left ">Your Material</p>
            <CreateMaterial isLoading={isLoading} />
          </div>
          <div className="flex flex-col gap-3 mt-4">
            {isLoading || isRefetching ? (
              Array(3)
                .fill(1)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-full bg-gray-500 animate-pulse rounded-md h-12"
                  />
                ))
            ) : items?.material?.length !== 0 ? (
              items?.material?.map((item) => (
                <div
                  key={item.id}
                  className="shadow-md p-3 border-[1px] border-gray-200 rounded-md"
                >
                  <div className="flex justify-between ">
                    <div>
                      <p className="text-sm font-semibold capitalize">
                        {item.name}
                      </p>
                      <p className=" text-xs text-slate-500">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                      <p className=" capitalize w-fit my-3 text-orange-700 bg-orange-200 rounded-md px-2 py0.5 text-md">
                        {item.type}
                      </p>
                      {item.type === "video" &&
                        item.source_path.includes("youtu") && (
                          <div>
                            <iframe
                              width="300"
                              height="300"
                              src={`https://www.youtube.com/embed/${
                                /// MAKE SPLIT AND PICK THE UNIX STRING ONLY
                                item.source_path.split("//youtu.be/")[1]
                              }`}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                    </div>
                  </div>
                  {profileData.is_admin && (
                    <div className="flex gap-2 mt-2">
                      <DeleteMaterial courseId={id} materialId={item.id} />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <EmptyMessage desc="Opss, looks like you dont have any material !" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
