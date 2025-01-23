import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import useMutationPost from "@/hooks/useMutationPost";
import { CustomDialog } from "@/components/dialog";

export function CreateCategory() {
  const {
    control,
    watch,
    resetField,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: {
      name: "",
    },
  });
  const { name } = watch();
  const mutation = useMutationPost({
    invalidateKey: "/category",
    api: "/category",
    afterSuccess: () => {
      const closeDialog = document.getElementById("close-dialog-category");
      if (closeDialog) {
        closeDialog.click();
      }
      resetField("name");
    },
  });
  const onSubmit = () => {
    mutation.mutate({ name });
  };
  return (
    <CustomDialog
      idCloseDialog="close-dialog-category"
      disabledSubmit={mutation.isPending}
      onClickSubmit={onSubmit}
      buttonLabel="Create New"
      title="Create New Category"
      titleDesc="Type input down below to and click create button to add new category"
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Controller
          name="name"
          rules={{ required: "name is required" }}
          render={({ field }) => (
            <Input {...field} id="name" type="text" placeholder="Type here." />
          )}
          control={control}
        />
        {errors.name && (
          <p className=" text-xs text-red-500 leading-3">
            {errors.name.message}
          </p>
        )}
      </div>
    </CustomDialog>
  );
}
