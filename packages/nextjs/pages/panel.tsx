import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { Footer2 } from "~~/components/Footer2";
import { GradientBorderButton } from "~~/components/GradientBorderButton";
import { Select } from "~~/components/Select";
import { SvgBNB } from "~~/components/svg/BNB";
import { SvgLink } from "~~/components/svg/Link";

const selectOptions = ["galxe-campaigns", "bodhi-text-contents"];
const links = [
  {
    text: "github_link",
  },
  {
    text: "TAGGtagger_dapp",
  },
  {
    text: "TAGGtagger_dapp",
  },
  {
    text: "tagger_Smart_COntract",
  },
];

const Panel: NextPage = () => {
  const [showSelect, setShowSelect] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [text, setText] = useState("Select a DataSet");

  const onSelectOptionClick = (index: number) => {
    setSelectedOption(index);
    setBtnText(selectOptions[index]);
  };

  return (
    <div className="flex flex-col mx-auto w-content font-poppins">
      {/* Banner */}
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex flex-col w-[813px] space-y-4 shrink-0">
          {/* Upper */}
          <div className="flex flex-col space-y-9">
            {/* Intro Text */}
            <div className="flex flex-col space-y-6">
              <div className="text-6xl font-medium tracking-[0.6px] uppercase">
                Label data for AI training and earn rewards!
              </div>
              <div className="text-4xl tracking-[0.6px]">MoveSpace AI data labeler platform</div>
            </div>
            <div className="w-[615px] h-px shrink-0 bg-purple-to-blue"></div>
          </div>
          {/* Lower */}
          <div className="flex items-center space-x-3 lower">
            <SvgBNB className="text-yellow-400" />
            <div className="text-xl text-light-gray">Powered by BNB Greenfield , BNBChain & opBNB</div>
          </div>
        </div>
        {/* Right */}
        <div className="-translate-x-12 shrink-0">
          <Image src="/assets/artwork.png" width={600} height={574} alt="artwork" />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-8">
        <Select
          showSelect={showSelect}
          options={selectOptions}
          selectedOption={selectedOption}
          onSelectClick={() => setShowSelect(!showSelect)}
          text={text}
          onSelectOptionClick={onSelectOptionClick}
        />
      {/* Item Links */}
      <div className="flex flex-col items-center pt-16 mx-auto space-y-5">
        <span className="text-2xl font-bold">VIEW DATA ITEMS IN BUCKET</span>
        <span className="capitalize text-gray1">whitepapers for all the projects</span>
        <div className="flex items-center space-x-5 text-sm font-medium uppercase text-gray1">
          {links.map((linkItem, index) => (
            <div className="flex items-center space-x-1.5 cursor-pointer" key={index}>
              <SvgLink />
              <span className="underline underline-offset-2">{linkItem.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default Panel;
