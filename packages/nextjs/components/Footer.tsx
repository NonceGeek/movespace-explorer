import Link from "next/link";
import { SvgTwitter } from "./svg/Twitter";

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
        <SvgTwitter className="w-4 text-gradFrom" />
        <span className="font-semibold font-poppins">Follow MoveSpace on Twitter</span>
      </Link>
    </div>
  );
};
