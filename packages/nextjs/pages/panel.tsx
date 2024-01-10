import { useEffect, useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
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

const Panel: NextPage = () => {
  const [mockData, setMockData] = useState<any[]>([]);

  useEffect(() => {
    setMockData(fakeData);
    console.log(mockData);
  }, []);

  return (
    <div className="flex flex-col mx-auto w-content font-poppins">
      <div className="flex items-center justify-between banner">
        <div className="flex flex-col w-3/5 space-y-4 left">
          <div className="flex flex-col space-y-9 upper">
            <div className="flex flex-col space-y-6 intro">
              <div className="text-6xl font-medium uppercase">Label data for AI training and earn rewards!</div>
              <div className="text-4xl">MoveSpace AI data labeler platform</div>
            </div>
            <div className="w-full h-px shrink-0 bg-purple-to-blue"></div>
          </div>
          <div className="flex items-center space-x-3 lower">
            <SvgBNB className="text-yellow-400" />
            <div className="text-xl text-light-gray">Powered by BNB Greenfield , BNBChain & opBNB</div>
          </div>
        </div>
        <div className="right">
          <Image src="/assets/artwork.png" width={600} height={574} alt="artwork" />
        </div>
      </div>
    </div>
  );
};

export default Panel;
