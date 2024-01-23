import { useEffect, useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { Footer2 } from "~~/components/Footer2";
import { GradientBorderButton } from "~~/components/GradientBorderButton";
// import { Pagination } from "~~/components/Pagination";
import { Select } from "~~/components/Select";
import { SvgBNB } from "~~/components/svg/BNB";
import { SvgLink } from "~~/components/svg/Link";
import { SvgSearch } from "~~/components/svg/Search";
import { SvgSelectDown2 } from "~~/components/svg/SelectDown2";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const selectOptions = ["galxe-campaigns", "bodhi-text-contents"];

const Panel: NextPage = () => {
  const [showSelect, setShowSelect] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [text, setText] = useState("Select a dataset");
  const [datasets, setDatasets] = useState<any>([]);
  const [dataset, setDataset] = useState<any>({});
  const [items, setItems] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [activeElement, setActiveElement] = useState<string | null>("1");
  const [uuid, setUuid] = useState<string>("");
  const { data, refetch } = useScaffoldContractRead({
    contractName: "GalaxeItemTagger",
    functionName: "uuidTags",
    args: [uuid],
  });

  useEffect(() => {
    if (datasets.length === 0) {
      getDatasets();
    }
  }, []);

  useEffect(() => {
    if (Object.keys(dataset).length > 0) {
      setLinks([
        {
          text: "tagger_smart_contract",
          link: `https://opbnbscan.com/address/${dataset.tagger_contracts.opbnb}`,
        },
        {
          text: "bucket_on_greenfield",
          link: dataset.greenfield_bucket,
        },
        {
          text: "glacier",
          link: dataset.glacier_url,
        }
      ]);
    }
  }, [dataset]);

  async function getDatasets() {
    const response = await fetch("https:///query-datasets.deno.dev", {
      method: "GET",
    });
    const resp = await response.json();
    console.log("datasets", resp);
    setDatasets(resp);
  }

  const onSelectOptionClick = (index: number) => {
    setSelectedOption(index);
    console.log(selectOptions[index]);
    setText(selectOptions[index]);
  };

  async function getItems(dataset_name: string, cursor: number, num: number) {
    const datasetNameActually = selectDataset(dataset_name);
    const response = await fetch("https://query-item.deno.dev/query_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dataset_name: datasetNameActually,
        cursor: cursor,
        num: num,
      }),
    });
    console.log("dataset_name", datasetNameActually);

    const resp = await response.json();

    console.log("resp 3: ", resp);
    // TODO: Here is a bug, not refresh when select another dataset.
    // const itemsWithTags = await Promise.all(
    //   resp.map(async (item: any) => {
    //     setUuid("6ff3a14e-8082-4056-9f62-96d7ef70bde8");
    //     // setUuid(item.uuid);
    //     console.log("uuid", item.uuid);
    //     const res: any = await refetch();
    //     await console.log("refetch:", res);
    //     // TODO: put res.data[0] into tags
    //     if (res.data[1] === "") {
    //       return { ...item, tags: {} };
    //     }
    //     return { ...item, tags: JSON.parse(res.data[1]) };
    //   }),
    // );
    const itemsWithTags = [];
    for (const item of resp) {
      setUuid(item.uuid);
      console.log("uuid", item.uuid);
      const res = await refetch();
      console.log("refetch:", res);

      let parsedTags = {};
      if (res.data && res.data[1] !== "") {
        try {
          parsedTags = JSON.parse(res.data[1]);
        } catch (e) {
          console.error("Error parsing tags JSON for item", item.uuid, e);
        }
      }

      itemsWithTags.push({ ...item, tags: parsedTags });
    }

    setItems(itemsWithTags);
    return;
  }

  async function getDataset(dataset_name: string) {
    const dataset = datasets.find((item: { name: string }) => item.name === dataset_name);
    setDataset(dataset);
  }

  const onGradientBorderButtonClick = async () => {
    // DONE: 1. fetch info of Dataset;

    // DONE: 2. fetch data of Dataset;
    // DONE: 3. fetch tagger for smart contract;
    getDataset(text);
    await getItems(text, 0, 9);
  };

  const TagButton = ({ tagged }: { tagged: boolean }) => {
    return (
      <div
        className={`flex items-center justify-center w-[106px] h-[38px] rounded-full text-lg font-medium ${
          !tagged
            ? "bg-[#CFCFCF] border-[#B5B5B5] border-[1.5px] box-border cursor-pointer dark:bg-[#3D3D3D] dark:text-white"
            : "bg-gradient-to-r from-gradFrom to-gradTo text-white dark:text-dark"
        }`}
      >
        {tagged ? "Tagged" : "Tag"}
      </div>
    );
  };

  function selectDataset(dataset_name: string) {
    switch (dataset_name) {
      case "bodhi-text-contents":
        return "bodhi_text_assets_k_v";
      case "galxe-campaigns":
        return "galxe_campaigns";
      default:
        return "opps";
    }
  }

  type PaginationProps = {
    text: string;
    active?: boolean;
    onClick?: (cursor: number) => void;
  };

  const Element = ({ text, active, onClick }: PaginationProps) => (
    <span
      className={`flex items-center justify-center w-8 h-8 bg-[#F5F5F5] border border-[#EEEEEE] rounded cursor-pointer dark:bg-[#171717] dark:border-[#1E1E1E] ${
        active && "bg-gradient-to-r from-gradFrom to-gradTo text-white"
      }`}
      onClick={() => onClick && onClick(parseInt(text, 10))}
    >
      {text}
    </span>
  );

  const toPage = (cursor: number) => {
    setActiveElement(cursor.toString());
    getItems(text, cursor, 9);
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
            <div className="flex flex-col space-y-6 dark:text-white">
              <div className="text-6xl font-medium tracking-[0.6px]">Label, review, rate & earn</div>
              <div className="text-4xl tracking-[0.6px]">MoveSpace AI label platform</div>
            </div>
            <div className="w-[615px] h-px shrink-0 bg-purple-to-blue"></div>
          </div>
          {/* Lower */}
          <div className="flex items-center space-x-3 lower">
            <SvgBNB className="text-yellow-400" />
            <div className="text-xl text-light-gray dark:text-dark-gray">
              Powered by BNB Greenfield , BNBChain & opBNB
            </div>
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
          btnText="Open dataset"
          disabled={selectedOption === null}
          onClick={onGradientBorderButtonClick}
        />
      </div>
      {/* Item Links */}
      {links.length > 0 && (
        <div className="flex flex-col items-center pt-16 mx-auto space-y-5">
          <span className="text-2xl font-bold dark:text-light-deep">VIEW DATA ITEMS IN BUCKET</span>
          <span className="capitalize text-gray1">{dataset.description}</span>
          <div className="flex items-center space-x-5 text-sm font-medium uppercase text-gray1">
            {links.map((linkItem, index) => (
              <div className="flex items-center space-x-1.5 cursor-pointer" key={index}>
                <SvgLink />
                <a href={`${linkItem.link}`} target="_blank">
                  <span className="underline underline-offset-2">{linkItem.text}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Item List */}
      <div className="flex flex-col w-full mt-20 space-y-20 bg-white rounded-md py-14 shadow-table dark:bg-dark dark:box-border dark:border-2 dark:border-dark-gray3 dark:shadow-none">
        {/* Table Header */}
        <div className="flex items-center justify-between mx-7">
          <span className="text-2xl font-semibold dark:text-white">Data items</span>
          <div className="flex items-center justify-between space-x-5">
            <div className="flex items-center h-12 p-2 space-x-2 bg-[#F9FBFF] rounded-xl dark:bg-dark">
              <SvgSearch className="text-dark-gray3" />
              <input
                type="text"
                className="w-full text-gray-600 border-0 rounded-md bg-inherit ring-0 placeholder:text-gray-400 focus:ring-0 focus:outline-none focus-visible:ring-0"
                placeholder="Search"
              />
            </div>
            <div className="flex items-center h-12 px-3 py-2 space-x-2 bg-[#F9FBFF] rounded-xl dark:bg-dark">
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
            <div className="flex items-center justify-between mx-12 text-gray-400 uppercase dark:text-gray3">
              <div className="flex">
                <span className="w-[50px]">ID</span>
                <span className="w-[100px] mr-[70px]">UUID</span>
                <span className="w-[300px] mr-[100px]">CONTENT</span>
                <span className="w-[300px]">METADATA</span>
                <span className="w-[200px]">Tag</span>
              </div>
              <span className="pr-3">Action</span>
            </div>
            <div className="w-full h-px mt-5 bg-gray-100"></div>
            {/* ItemList Body */}
            <div className="flex flex-col mx-12">
              {items.map((item, index) => (
                <div
                  className="flex items-center justify-between h-40 border-b border-gray-100 dark:text-gray3"
                  key={index}
                >
                  <div className="flex items-center">
                    <span className="w-[50px]">{index + 1}</span>
                    <span className="w-[100px] mr-[70px] relative group">
                      <span className="line-clamp-1">{item.uuid}</span>
                      <span className="absolute z-10 hidden p-2 text-xs bg-white border border-gray-600 rounded-lg min-w-48 group-hover:inline dark:bg-dark dark:border-dark-gray3">
                        {item.uuid}
                      </span>
                    </span>
                    <span className="w-[180px] mr-[100px] relative group">
                      <span className="line-clamp-1">{item.data}</span>
                      <span className="absolute z-10 hidden p-2 text-xs bg-white border border-gray-600 rounded-lg min-w-48 group-hover:inline dark:bg-dark dark:border-dark-gray3">
                        {item.data}
                      </span>
                    </span>
                    <span className="w-[300px] relative group" style={{ display: "block" }}>
                      <span className="line-clamp-1">
                        <table>
                          <tbody>
                            {Object.entries(item.metadata).map(([key, value]) => (
                              <tr key={key}>
                                <td style={{ padding: "8px", fontWeight: "bold" }}>{key}</td>
                                <td style={{ padding: "8px" }}>{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </span>
                      <span className="absolute z-10 hidden p-2 text-xs bg-white border border-gray-600 rounded-lg min-w-48 group-hover:inline dark:bg-dark dark:border-dark-gray3">
                        <table>
                          <tbody>
                            {Object.entries(item.metadata).map(([key, value]) => (
                              <tr key={key}>
                                <td style={{ padding: "8px", fontWeight: "bold" }}>{key}</td>
                                <td style={{ padding: "8px" }}>{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </span>
                    </span>

                    <span className="w-[200px] relative group">
                      <span className="line-clamp-1">
                        <table>
                          <tbody>
                            {Object.entries(item.tags).map(([key, value]) => (
                              <tr key={key}>
                                <td style={{ padding: "8px", fontWeight: "bold" }}>{key}</td>
                                <td style={{ padding: "8px" }}>{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </span>
                      <span className="absolute z-10 hidden p-2 text-xs bg-white border border-gray-600 rounded-lg min-w-48 group-hover:inline dark:bg-dark dark:border-dark-gray3">
                        <table>
                          <tbody>
                            {Object.entries(item.tags).map(([key, value]) => (
                              <tr key={key}>
                                <td style={{ padding: "8px", fontWeight: "bold" }}>{key}</td>
                                <td style={{ padding: "8px" }}>{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </span>
                    </span>
                  </div>
                  <a href={`tag?item_id=${item.uuid}&contract_name=${text}`} target="_blank">
                    <TagButton tagged={item.tagged} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Table Footer */}
        <div className="flex items-center justify-between mx-14">
          <span className="text-lg font-medium text-[#B5B7C0] opacity-0">Pages</span>
          {/* Pagination */}
          {/* <Pagination /> */}
          <div className="flex items-center justify-between space-x-4 dark:text-[#404B52]">
            <Element text={"<"} />
            <Element text={"1"} active={activeElement === "1"} onClick={toPage} />
            {/* TODO: it's not show proper now. */}
            <Element text={"2"} active={activeElement === "2"} onClick={toPage} />
            <Element text={"3"} active={activeElement === "3"} onClick={toPage} />
            <Element text={"4"} active={activeElement === "4"} onClick={toPage} />
            <Element text={"5"} active={activeElement === "5"} onClick={toPage} />
            <Element text={"6"} active={activeElement === "6"} onClick={toPage} />
            <span>...</span>
            <Element text={"40"} />
            <Element text={">"} />
          </div>
        </div>
      </div>

      <Footer2 />
    </div>
  );
};

export default Panel;
