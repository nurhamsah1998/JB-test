/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";
import { FormCourseType, variantLevel } from "../CreateCourse";
import { CreateCategory } from "./CreateCategory";
import { UseMutationResult } from "@tanstack/react-query";
import CustomInputFile from "@/components/custom-input-file";

function FormCreateCourse({
  control,
  errors,
  isLoadingCategory,
  setValue,
  level,
  category,
  program,
  dataSelect,
  isLoadingProgram,
  mutation,
  thumbnail,
  clearErrors,
}: {
  clearErrors: UseFormClearErrors<FormCourseType>;
  control: Control<FormCourseType, any>;
  errors: FieldErrors<FormCourseType>;
  isLoadingCategory: boolean;
  isLoadingProgram: boolean;
  setValue: UseFormSetValue<FormCourseType>;
  level: string;
  thumbnail: any;
  category: string | undefined;
  program: string | undefined;
  dataSelect: {
    programs: {
      id: number;
      title: string;
    }[];
    categories: {
      id: number;
      title: string;
    }[];
  };
  mutation: UseMutationResult<any, Error, unknown, unknown>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Create Course</h1>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Controller
          name="name"
          rules={{ required: "name is required" }}
          render={({ field }) => (
            <Input {...field} id="name" type="text" placeholder="IT" />
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
        <Label htmlFor="price">Price</Label>
        <Controller
          name="price"
          rules={{ required: "price is required" }}
          render={({ field }) => (
            <Input {...field} id="price" type="number" placeholder="20000" />
          )}
          control={control}
        />
        {errors.price && (
          <p className=" text-xs text-red-500 leading-3">
            {errors.price.message as string}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Controller
          name="thumbnail"
          render={() => (
            <CustomInputFile
              id="thumbnail"
              onChange={(i) => {
                setValue("thumbnail", (i.target.files as any)[0]);
                clearErrors("thumbnail");
              }}
              file={thumbnail}
              accept="image/*"
            />
          )}
          control={control}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          rules={{ required: "description is required" }}
          render={({ field }) => (
            <Textarea
              {...field}
              id="description"
              className=" min-h-32 resize-none"
              placeholder="some course"
            />
          )}
          control={control}
        />
        {errors.description && (
          <p className=" text-xs text-red-500 leading-3">
            {errors.description.message as string}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="level">Level</Label>
        <Controller
          name="level"
          rules={{ required: "level is required" }}
          render={() => (
            <Select
              onValueChange={(i) => {
                setValue("level", i);
                clearErrors("level");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={level || "Select level"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {variantLevel.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          control={control}
        />
        {errors.level && (
          <p className=" text-xs text-red-500 leading-3">
            {errors.level.message as string}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Controller
          name="category"
          rules={{ required: "category is required" }}
          render={() => (
            <div className="flex gap-2">
              <Select
                onValueChange={(i) => {
                  setValue("category", i);
                  clearErrors("category");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      isLoadingCategory
                        ? "Loading..."
                        : category || "Select category"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {dataSelect.categories?.map((item) => (
                      <SelectItem key={item.id} value={item.title}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <CreateCategory />
            </div>
          )}
          control={control}
        />
        {errors.category && (
          <p className=" text-xs text-red-500 leading-3">
            {errors.category.message as string}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="program">Program</Label>
        <Controller
          name="program"
          rules={{ required: "program is required" }}
          render={() => (
            <Select
              onValueChange={(i) => {
                setValue("program", i);
                clearErrors("program");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    isLoadingProgram
                      ? "Loading..."
                      : program || "Select program"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dataSelect.programs?.map((item) => (
                    <SelectItem key={item.id} value={item.title}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          control={control}
        />
        {errors.program && (
          <p className=" text-xs text-red-500 leading-3">
            {errors.program.message as string}
          </p>
        )}
      </div>
      <Button disabled={mutation.isPending} type="submit" className="w-full">
        Create
      </Button>
      <div className="w-[300px] sm:w-[500px] " />
    </div>
  );
}

export default FormCreateCourse;
