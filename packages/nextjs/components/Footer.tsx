import Image from "next/image";

export const Footer = () => {
  return (
    <div className="flex items-center justify-center w-full pt-10 pb-20 space-x-2">
      <Image src="/svg/twitter.svg" alt="logo" width={14} height={11} />
      <span>Follow MoveSpace Twitter</span>
    </div>
  );
};
