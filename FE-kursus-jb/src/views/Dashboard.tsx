import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { variantLevel } from "./create-course/CreateCourse";

type Program = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: number;
};
type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: number;
};
type Course = {
  id: number;
  name: string;
  price: number;
  description: string;
  thumbnail_path: string;
  level: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  category_id: number;
  category?: Category;
  program_id: number;
  program?: Program;
};

function Dashboard() {
  const nav = useNavigate();
  const { items, isLoading } = useFetch({
    api: "/my-course",
    invalidateKey: "/my-course",
  });
  const itemsCourse: Course[] = useMemo(() => (items ? items : []), [items]);
  return (
    <div>
      <div className="flex justify-end mb-5">
        <Button onClick={() => nav("/my-course/create")}>
          Create new course
        </Button>
      </div>
      <div
        className={`grid ${
          !isLoading && itemsCourse?.length === 0
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-3"
        } gap-2`}
      >
        {isLoading ? (
          Array(6)
            .fill(1)
            .map((_, e) => (
              <div
                key={e}
                className="shadow-md bg-gray-500 animate-pulse min-h-48 p-5 rounded-md "
              ></div>
            ))
        ) : itemsCourse?.length !== 0 ? (
          itemsCourse?.map((item) => {
            const level = variantLevel?.find(
              (vItem) => vItem?.name === item?.level
            );
            return (
              <div
                onClick={() => nav(`/my-course/detail/${item.id}`)}
                key={item?.id}
                className="shadow-md p-5 hover:scale-[1.01] duration-200 cursor-pointer"
              >
                <img
                  className=" rounded-md w-1/2"
                  src={`http://localhost:8000/storage/${item?.thumbnail_path}`}
                />
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
                  <p className=" text-2xl font-semibold">{item.price}</p>
                  <p className=" text-md font-semibold mt-3">{item.name}</p>
                  <p className=" text-xs text-slate-700">{item.description}</p>
                </div>
                <div className="mt-5">
                  <p className=" text-sm text-slate-600 text-right">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center ">
            <p className=" text-lg font-bold text-gray-600">Empty</p>
            <p className=" text-sm text-gray-600">
              Opss, looks like you dont have any course !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
