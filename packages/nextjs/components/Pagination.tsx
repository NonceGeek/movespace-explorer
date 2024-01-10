type PaginationProps = {
  text: string;
  active?: boolean;
};

export const Pagination = () => {
  const Element = ({ text, active }: PaginationProps) => (
    <span
      className={`flex items-center justify-center w-8 h-8 border border-[#EEEEEE] rounded bg-[#F5F5F5] ${
        active && "bg-gradient-to-r from-gradFrom to-gradTo text-white"
      }`}
    >
      {text}
    </span>
  );

  return (
    <div className="flex items-center justify-between space-x-4">
      <Element text={"<"} />
      <Element text={"1"} active={true} />
      <Element text={"2"} />
      <Element text={"3"} />
      <Element text={"4"} />
      <span>...</span>
      <Element text={"40"} />
      <Element text={">"} />
    </div>
  );
};
