import { CustomDialog } from "@/components/dialog";
import useMutationDelete from "@/hooks/useMutationDelete";

function DeleteMaterial({
  courseId,
  materialId,
}: {
  courseId: string | undefined;
  materialId: string | number | undefined;
}) {
  const mutation = useMutationDelete({
    api: "/my-course/material",
    invalidateKey: `/my-course/${courseId}`,
    showNotifSuccess: "Succesfully delete material",
  });
  return (
    <CustomDialog
      idCloseDialog="close-dialog-delete-material"
      disabledSubmit={mutation.isPending}
      onClickSubmit={() => mutation.mutate(materialId)}
      buttonLabel="Delete"
      size="sm"
      title="Delete Material"
      labelSubmit="Delete"
      titleDesc="Are you sure want to delete this material ?"
    />
  );
}

export default DeleteMaterial;
