import { useEffect, useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { Footer2 } from "~~/components/Footer2";
import { GradientBorderButton } from "~~/components/GradientBorderButton";
import { Pagination } from "~~/components/Pagination";
import { Select } from "~~/components/Select";
import { SvgBNB } from "~~/components/svg/BNB";
import { SvgLink } from "~~/components/svg/Link";
import { SvgSearch } from "~~/components/svg/Search";
import { SvgSelectDown2 } from "~~/components/svg/SelectDown2";

const selectOptions = ["galxe-campaigns", "bodhi-text-contents"];
const sampleItem = {
  uuid: "4e2f059f-391d-4fa8-9a8d-2732ae0cc7ca",
  content: "Bitcoin: A peer-to-peer electronic cash system",
  metadata:
    "Consequat minim eu in id consectetur labore. Ad proident quis nisi officia aliqua sint aliqua culpa incididunt est occaecat in cupidatat commodo.",
};
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
  const [dataLoaded, setDataLoaded] = useState(false);
  const [btnText, setBtnText] = useState("Open dataset");
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (dataLoaded) {
      setBtnText("Collapse items");
    }
  }, [dataLoaded]);

  const onSelectOptionClick = (index: number) => {
    setSelectedOption(index);
    setText(selectOptions[index]);
  };

  const onGradientBorderButtonClick = async () => {
    if (!dataLoaded) {
      await mockFetchData();
      setDataLoaded(true);
      return;
    }
  };

  const mockFetchData = async () => {
    // iterate 8 times with for loop
    const mockData = [];
    for (let i = 0; i < 8; i++) {
      mockData.push({
        ...sampleItem,
        tagged: Math.random() >= 0.5,
      });
    }
    setItems(mockData);
  };

  const TagButton = ({ tagged }: { tagged: boolean }) => {
    return (
      <div
        className={`flex items-center justify-center w-[106px] h-[38px] rounded-full text-lg font-medium ${
          !tagged
            ? "bg-[#CFCFCF] border-[#B5B5B5] border-[1.5px] box-border cursor-pointer"
            : "bg-gradient-to-r from-gradFrom to-gradTo text-white"
        }`}
      >
        {tagged ? "Tagged" : "Tag"}
      </div>
    );
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
        <GradientBorderButton
          btnText={btnText}
          disabled={selectedOption === null}
          onClick={onGradientBorderButtonClick}
        />
      </div>
      {/* Item Links */}
      {dataLoaded && (
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
      )}
      {/* Item List */}
      {dataLoaded && (
        <div className="flex flex-col w-full mt-20 space-y-20 bg-white rounded-md py-14 shadow-table">
          {/* Table Header */}
          <div className="flex items-center justify-between mx-7">
            <span className="text-2xl font-semibold uppercase">Items in VectorDB</span>
            <div className="flex items-center justify-between space-x-5">
              <div className="flex items-center h-12 p-2 space-x-2 bg-[#F9FBFF] rounded-xl">
                <SvgSearch className="text-dark-gray3" />
                <input
                  type="text"
                  className="w-full text-gray-600 border-0 rounded-md bg-inherit ring-0 placeholder:text-gray-400 focus:ring-0 focus:outline-none focus-visible:ring-0"
                  placeholder="Search"
                />
              </div>
              <div className="flex items-center h-12 px-3 py-2 space-x-2 bg-[#F9FBFF] rounded-xl">
                <span className="flex items-center space-x-1">
                  <span className="text-[#7E7E7E]">Sort by:</span>
                  <span className="font-semibold text-[#3D3C42]">Newest</span>
                </span>
                <SvgSelectDown2 />
              </div>
            </div>
          </div>
          {/* Table Body */}
          {items.length > 0 && (
            <div className="flex flex-col w-full">
              {/* ItemList Header */}
              <div className="flex items-center justify-between mx-12 uppercase">
                <div className="flex">
                  <span className="w-[220px] text-gray-400">ID</span>
                  <span className="w-[100px] mr-[70px] text-gray-400">UUID</span>
                  <span className="w-[100px] mr-[100px] text-gray-400">CONTENT</span>
                  <span className="w-[360px] text-gray-400">METADATA</span>
                </div>
                <span className="pr-3 text-gray-400">TAG ITEMS</span>
              </div>
              <div className="w-full h-px mt-5 bg-gray-100"></div>
              {/* ItemList Body */}
              <div className="flex flex-col mx-12">
                {items.map((item, index) => (
                  <div className="flex items-center justify-between h-20 border-b border-gray-100" key={index}>
                    <div className="flex items-center">
                      <span className="w-[220px]">{index + 1}</span>
                      <span className="w-[100px] mr-[70px] relative group">
                        <span className="line-clamp-1">{item.uuid}</span>
                        <span className="absolute z-10 hidden p-2 text-xs bg-white border border-gray-600 rounded-lg min-w-48 group-hover:inline">
                          {item.uuid}
                        </span>
                      </span>
                      <span className="w-[100px] mr-[100px] relative group">
                        <span className="line-clamp-1">{item.content}</span>
                        <span className="absolute z-10 hidden p-2 text-xs bg-white border border-gray-600 rounded-lg min-w-48 group-hover:inline">
                          {item.content}
                        </span>
                      </span>
                      <span className="w-[360px] relative group">
                        <span className="line-clamp-1">{item.metadata}</span>
                        <span className="absolute z-10 hidden p-2 text-xs bg-white border border-gray-600 rounded-lg min-w-48 group-hover:inline">
                          {item.metadata}
                        </span>
                      </span>
                    </div>
                    <TagButton tagged={item.tagged} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Table Footer */}
          <div className="flex items-center justify-between mx-14">
            <span className="text-lg font-medium text-[#B5B7C0]">Showing data 1 to 8 of 256K entries</span>
            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      )}
      <Footer2 />
    </div>
  );
};

export default Panel;
