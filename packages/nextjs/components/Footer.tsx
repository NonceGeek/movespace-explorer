import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex items-center justify-center w-full pt-10 pb-20">
      <Link
        className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gradFrom to-gradTo bg-clip-text hover:drop-shadow"
        style={{
          WebkitTextFillColor: "transparent",
        }}
        href="https://twitter.com/movespacexyz"
      >
        <Image src="/svg/twitter.svg" className="fill-gradFrom" alt="logo" width={14} height={11} />
        <span className="font-semibold font-poppins">Follow MoveSpace on Twitter</span>
      </Link>
    </div>
  );
};
