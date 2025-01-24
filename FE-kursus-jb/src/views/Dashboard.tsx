import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import EmptyMessage from "@/components/empty-message";
import CardCourse from "@/components/card-course";
import { Category, Material, Program, User } from "./additional-type";

export type CourseType = {
  id: number;
  name: string;
  price: number;
  description: string;
  thumbnail_path: string;
  level: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  user: User;
  material?: Material[];
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

  const itemsCourse: CourseType[] = useMemo(
    () => (items ? items : []),
    [items]
  );
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <p className="text-lg font-semibold text-gray-600">Course</p>
          <p className="text-sm leading-3 text-gray-600">
            all your courses are here
          </p>
        </div>
        <Button onClick={() => nav("/jb-admin/my-course/create")}>
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

export default Dashboard;
