/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import useMutationPost from "@/hooks/useMutationPost";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomDialog } from "@/components/dialog";
import CustomInputFile from "@/components/custom-input-file";

export function CreateMaterial() {
  const {
    control,
    watch,
    resetField,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; type: string; url?: string; document?: any }>({
    defaultValues: {
      name: "",
      type: "",
      url: "",
      document: "",
    },
  });
  const { name, type, document } = watch();
  const mutation = useMutationPost({
    invalidateKey: "/materials",
    api: "/materials",
    afterSuccess: () => {
      const closeDialog = document.getElementById("close-dialog-material");
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
      idCloseDialog="close-dialog-material"
      disabledSubmit={mutation.isPending}
      onClickSubmit={handleSubmit(onSubmit)}
      buttonLabel="Create New Material"
      title="Create New Material"
      titleDesc="-"
    >
      <form className=" space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Controller
            name="name"
            rules={{ required: "name is required" }}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                type="text"
                placeholder="Type here."
              />
            )}
            control={control}
          />
          {errors.name && (
            <p className=" text-xs text-red-500 leading-3">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="type">Type</Label>
          <Controller
            name="type"
            rules={{ required: "type is required" }}
            render={() => (
              <Select onValueChange={(i) => setValue("type", i)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"Select type"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            control={control}
          />
          {errors.type && (
            <p className=" text-xs text-red-500 leading-3">
              {errors.type.message}
            </p>
          )}
        </div>
        {type === "video" && (
          <div className="grid gap-2">
            <Label htmlFor="url">URL link</Label>
            <Controller
              name="url"
              rules={{ required: "url is required" }}
              render={({ field }) => (
                <Input {...field} id="url" type="text" placeholder="https://" />
              )}
              control={control}
            />
            {errors.url && (
              <p className=" text-xs text-red-500 leading-3">
                {errors.url.message}
              </p>
            )}
          </div>
        )}
        {type === "document" && (
          <div className="grid gap-2">
            <Label htmlFor="document">File Document</Label>
            <Controller
              rules={{ required: "file document is required" }}
              name="document"
              render={() => (
                <CustomInputFile
                  id="document"
                  onChange={(i) => {
                    setValue("document", (i.target.files as any)[0]);
                    clearErrors("document");
                  }}
                  file={document}
                  accept="image/*"
                />
              )}
              control={control}
            />
            {errors.document && (
              <p className=" text-xs text-red-500 leading-3">
                {errors.document.message as unknown as string}
              </p>
            )}
          </div>
        )}
      </form>
    </CustomDialog>
  );
}
