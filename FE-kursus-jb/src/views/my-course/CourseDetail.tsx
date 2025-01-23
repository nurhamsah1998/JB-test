import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import { CreateMaterial } from "./components/CreateMaterial";

function CourseDetail() {
  const { id } = useParams();
  const { items } = useFetch({
    api: `/my-course/${id}`,
    invalidateKey: `/my-course/${id}`,
    staleTime: 1,
    enabled: Boolean(id),
  });
  return (
    <div>
      <img
        className=" rounded-md w-1/2"
        src={`http://localhost:8000/storage/${items?.thumbnail_path}`}
      />
      <div>
        <p className="text-lg font-bold text-center mt-5">Your Material</p>
        <div>
          <CreateMaterial />
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
