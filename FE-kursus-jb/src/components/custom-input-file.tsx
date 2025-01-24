/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "./ui/input";

function CustomInputFile({
  onChange = () => {},
  id,
  file,
  accept,
}: {
  file: File;
  id: string;
  accept: string;
  onChange: (prop: any) => void;
}) {
  return (
    <div className="relative h-56">
      <Input
        onChange={onChange}
        id={id}
        type="file"
        accept={accept}
        className="z-[2] absolute w-full top-0 h-56 cursor-pointer opacity-0"
      />

      <div className="z-[1] overflow-hidden absolute flex justify-center items-center w-full top-0 h-56 bg-gray-300 border-dashed border-2 border-gray-500 rounded-md">
        {file?.type?.includes("image") ? (
          <img
            className="max-w-sm"
            src={(file as any) ? URL.createObjectURL(file) : ""}
          />
        ) : file?.type ? (
          <p className=" font-bold text-gray-600">{file?.name}</p>
        ) : (
          <p className=" font-bold text-gray-600">Drag & Drop your file here</p>
        )}
      </div>
    </div>
  );
}

export default CustomInputFile;
