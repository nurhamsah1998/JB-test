import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import EmptyMessage from "@/components/empty-message";
import CardCourse from "@/components/card-course";

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
type Material = {
  id: number;
  name: string;
  source_path: string;
  type: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  course_id: number;
};
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
