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
import { useParams } from "react-router-dom";

type FormMaterialType = {
  name?: string;
  type?: string;
  url?: string;
  document_file?: any;
};
export function CreateMaterial({ isLoading }: { isLoading: boolean }) {
  const {
    control,
    watch,
    setValue,
    clearErrors,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormMaterialType>({
    defaultValues: {
      name: "",
      type: "",
      url: "",
      document_file: "",
    },
  });
  const { type, document_file } = watch();
  const { id } = useParams();
  const mutation = useMutationPost({
    invalidateKey: `/my-course/${id}`,
    api: "/my-course/material",
    showNotifSuccess: "Succesfully create material",
    afterSuccess: () => {
      for (const key in watch()) {
        setValue(key as keyof FormMaterialType, "");
      }
      const closeDialog = document.getElementById("close-dialog-material");
      if (closeDialog) {
        closeDialog.click();
      }
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const onSubmit = (values: FormMaterialType & { course_id?: number }) => {
    for (const key in values) {
      if (!(values as any)[key as keyof FormMaterialType])
        delete values[key as keyof FormMaterialType];
    }
    if (values.type === "video") delete values.document_file;
    if (values.type === "document") delete values.url;
    values["course_id"] = Number(id);
    mutation.mutate(values);
  };
  const onClickCancel = () => {
    resetField("name");
    resetField("document_file");
    resetField("type");
    resetField("url");
  };
  return (
    <CustomDialog
      onClickCancel={onClickCancel}
      idCloseDialog="close-dialog-material"
      disabledSubmit={isLoading || mutation.isPending}
      onClickSubmit={handleSubmit(onSubmit)}
      buttonLabel="Create New Material"
      title="Create New Material"
      titleDesc="Insert your best material for your client"
    >
      <form className=" space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Label htmlFor="name">Title</Label>
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
            <span className="text-xs">
              By embedding YouTube videos on your site, you agree to the{" "}
              <a
                target="_blank"
                className="text-blue-500 cursor-pointer"
                href="https://developers.google.com/youtube/terms/api-services-terms-of-service"
              >
                YouTube API Terms of Service
              </a>
            </span>
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
              name="document_file"
              render={() => (
                <CustomInputFile
                  id="document_file"
                  onChange={(i) => {
                    setValue("document_file", (i.target.files as any)[0]);
                    clearErrors("document_file");
                  }}
                  file={document_file}
                  accept=".pdf,.jpg,.png"
                />
              )}
              control={control}
            />
            <span className="text-xs">
              We only accept pdf, png and jpg file
            </span>
            {errors.document_file && (
              <p className=" text-xs text-red-500 leading-3">
                {errors.document_file.message as unknown as string}
              </p>
            )}
          </div>
        )}
      </form>
    </CustomDialog>
  );
}
