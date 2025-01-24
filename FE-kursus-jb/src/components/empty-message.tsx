function EmptyMessage({ desc }: { desc: string }) {
  return (
    <div className="flex flex-col justify-center items-center ">
      <p className=" text-lg font-bold text-gray-600">Empty</p>
      <p className=" text-sm text-gray-600">{desc}</p>
    </div>
  );
}

export default EmptyMessage;
