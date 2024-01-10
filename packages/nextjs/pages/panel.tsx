import { useEffect, useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { GradientBorderButton } from "~~/components/GradientBorderButton";
import { Select } from "~~/components/Select";
import { SvgBNB } from "~~/components/svg/BNB";

const fakeData = [
  {
    id: 1,
    name: "test",
    description: "test",
    image: "test",
    price: "test",
    owner: "test",
    tags: ["test", "test"],
  },
];
const selectOptions = ["galxe-campaigns", "bodhi-text-contents"];

const Panel: NextPage = () => {
  const [mockData, setMockData] = useState<any[]>([]);
  const [showSelect, setShowSelect] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [btnText, setBtnText] = useState("Select a DataSet");

  useEffect(() => {
    setMockData(fakeData);
    console.log(mockData);
  }, []);

  const onSelectOptionClick = (index: number) => {
    setSelectedOption(index);
    setBtnText(selectOptions[index]);
  };

  return (
    <div className="flex flex-col mx-auto w-content font-poppins">
      {/* Banner */}
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex flex-col w-3/5 space-y-4">
          {/* Upper */}
          <div className="flex flex-col space-y-9">
            {/* Intro Text */}
            <div className="flex flex-col space-y-6">
              <div className="text-6xl font-medium uppercase">Label data for AI training and earn rewards!</div>
              <div className="text-4xl">MoveSpace AI data labeler platform</div>
            </div>
            <div className="w-full h-px shrink-0 bg-purple-to-blue"></div>
          </div>
          {/* Lower */}
          <div className="flex items-center space-x-3 lower">
            <SvgBNB className="text-yellow-400" />
            <div className="text-xl text-light-gray">Powered by BNB Greenfield , BNBChain & opBNB</div>
          </div>
        </div>
        {/* Right */}
        <div className="">
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
          btnText={btnText}
          onSelectOptionClick={onSelectOptionClick}
        />
        <GradientBorderButton btnText="Open dataset" />
      </div>
    </div>
  );
};

export default Panel;
