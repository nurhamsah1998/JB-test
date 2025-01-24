import { CustomDialog } from "@/components/dialog";
import useMutationDelete from "@/hooks/useMutationDelete";

function DeleteCourse({ courseId }: { courseId: number | undefined }) {
  const mutation = useMutationDelete({
    api: "/my-course",
    invalidateKey: `/my-course`,
    showNotifSuccess: "Succesfully delete material",
  });
  return (
    <CustomDialog
      idCloseDialog="close-dialog-delete-course"
      disabledSubmit={mutation.isPending}
      onClickSubmit={() => mutation.mutate(courseId)}
      buttonLabel="Delete"
      size="sm"
      title="Delete Course"
      labelSubmit="Delete"
      titleDesc="Are you sure want to delete this course ?"
    />
  );
}

export default DeleteCourse;
