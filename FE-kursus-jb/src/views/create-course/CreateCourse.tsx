/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import useMutationPost from "@/hooks/useMutationPost";
import FormCreateCourse from "./components/FormCreateCourse";

// eslint-disable-next-line react-refresh/only-export-components
export const variantLevel: { name: string; title: string }[] = [
  {
    name: "very_easy",
    title: "Very Easy",
  },
  {
    name: "easy",
    title: "Easy",
  },
  {
    name: "normal",
    title: "Normal",
  },
  {
    name: "hard",
    title: "Hard",
  },
  {
    name: "very_hard",
    title: "Very Hard",
  },
];
export type FormCourseType = {
  name: string;
  price: any;
  description?: string;
  category_id: number | null;
  category?: string;
  program_id: number | null;
  thumbnail?: any;
  level: string;
  program?: string;
};

export function CreateCourse({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<FormCourseType>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category_id: null,
      category: "",
      program_id: null,
      thumbnail: "",
      level: "",
      program: "",
    },
  });
  const { items: itemsProgram, isLoading: isLoadingProgram } = useFetch({
    api: "/program",
    invalidateKey: "/program",
  });
  const { items: itemsCategory, isLoading: isLoadingCategory } = useFetch({
    api: "/category",
    invalidateKey: "/category",
  });
  const dataSelect: {
    programs: { id: number; title: string }[];
    categories: { id: number; title: string }[];
  } = useMemo(() => {
    const programs = itemsProgram?.map((item: { id: any; name: any }) => ({
      id: item?.id,
      title: item?.name,
    }));
    const categories = itemsCategory?.map((item: { id: any; name: any }) => ({
      id: item?.id,
      title: item?.name,
    }));

    return { programs, categories };
  }, [itemsProgram, itemsCategory]);
  const { level, program, category, thumbnail } = watch();
  const nav = useNavigate();
  const mutation = useMutationPost({
    invalidateKey: "/my-course",
    api: "/my-course",
    afterSuccess: () => {
      nav("/");
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const onSubmit = async (values: FormCourseType) => {
    values.program_id = Number(
      dataSelect.programs.find((item) => item.title === values.program)?.id
    );
    values.category_id = Number(
      dataSelect.categories.find((item) => item.title === values.category)?.id
    );
    delete values.program;
    delete values.category;
    mutation.mutate(values);
  };
  return (
    <div className="w-full justify-center flex items-center px-4 sm:p-0">
      <div className={cn("flex flex-col gap-6 ", className)} {...props}>
        <Card className="overflow-hidden ">
          <CardContent className="grid p-0 md:grid-cols-1">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              <FormCreateCourse
                control={control}
                errors={errors}
                isLoadingCategory={isLoadingCategory}
                setValue={setValue}
                level={level}
                category={category}
                program={program}
                dataSelect={dataSelect}
                isLoadingProgram={isLoadingProgram}
                mutation={mutation}
                thumbnail={thumbnail}
                clearErrors={clearErrors}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
