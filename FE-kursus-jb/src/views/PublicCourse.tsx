import useFetch from "@/hooks/useFetch";
import React, { useMemo } from "react";
import { CourseType } from "./Dashboard";
import CardCourse from "@/components/card-course";
import EmptyMessage from "@/components/empty-message";
import { useNavigate } from "react-router-dom";

function PublicCourse() {
  const { items, isLoading } = useFetch({
    api: "/course",
    invalidateKey: "/course",
  });
  const itemsCourse: CourseType[] = useMemo(
    () => (items ? items : []),
    [items]
  );
  const nav = useNavigate();
  return (
    <div>
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 rounded-md min-h-40">
        <p className="text-3xl font-bold text-white leading-7">
          Welcome To JB Course
        </p>
        <p className="text-sm font-semibold text-white mt-2">
          With 10 years of experience and good teacher, we provide the most
          stuning course for you, Enjoy!. (dummy wording)
        </p>
        <p className="text-xs text-white">Nurhamsah</p>
      </div>
      <p className="mt-5 mb-2 font-semibold">Our course</p>
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
          itemsCourse?.map((item) => (
            <CardCourse key={item?.id} item={item} nav={nav} />
          ))
        ) : (
          <EmptyMessage desc="Opss, looks like you dont have any course !" />
        )}
      </div>
    </div>
  );
}

export default PublicCourse;
