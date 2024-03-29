type PaginationProps = {
  text: string;
  active?: boolean;
};

export const Pagination = () => {
  const Element = ({ text, active }: PaginationProps) => (
    <span
      className={`flex items-center justify-center w-8 h-8 bg-[#F5F5F5] border border-[#EEEEEE] rounded dark:bg-[#171717] dark:border-[#1E1E1E] ${
        active && "bg-gradient-to-r from-gradFrom to-gradTo text-white"
      }`}
    >
      {text}
    </span>
  );

  return (
    <div className="flex items-center justify-between space-x-4 dark:text-[#404B52]">
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
