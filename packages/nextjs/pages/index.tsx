import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";
import { useTheme } from "next-themes";
import { Footer } from "~~/components/Footer";
import { SvgLabel } from "~~/components/svg/Label";
import { SvgLoading } from "~~/components/svg/Loading";
import { SvgSelectDown } from "~~/components/svg/SelectDown";
import { SvgSelected } from "~~/components/svg/Selected";

//定义一个新的数据类型来记录后端返回的数据
export type resultByDataset = {
  dataset_id: string;
  results: search_result[];
};
//定义一个数据类型来记录每个搜索结果
export type search_result = {
  id: string;
  data: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  metadata: any;
};

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

const ETHSpace: NextPage = () => {
  const { theme } = useTheme();
  //在对后端发起请求后，将response的内容保存在results中
  //如果用户选择使用mixed模式，则使用resultByDataset来记录结果
  const [res, setRes] = useState<resultByDataset[]>([]);
  //设置默认是在我们提供的数据集而不是公共数据集中查询
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [datasetList, _setDatasetList] = useState(false);
  //获取目前提供的数据集选项
  const [options, setOptions] = useState<string[]>([]);
  // 设置是否显示下拉菜单
  const [showSelect, setShowSelect] = useState(false);
  // 记录选择的下拉菜单项的index
  const [selectedOption, setSelectedOption] = useState<number>(0);
  // const [itemId, setItemId] = useState<number>();
  //获取用户选择的数据集
  const [dataset, setDataset] = useState("galxe-campaigns");
  //获取用户搜索的prompt
  const [searchPrompt, setSearchPrompt] = useState("");
  const [searchPrompt2, setSearchPrompt2] = useState("");
  // 新建一个变量，用于标记搜索结果是否为空
  const [isEmpty, setIsEmpty] = useState(false);
  const [searching, setSearching] = useState(false);

  //仅在组件挂载时执行一次获取数据集列表

  // new feature
  const handleEnterPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      console.log("Enter Enter Key!");
      handleOnClick();
    }
    // TODO: maybe set an EGG here.
  };

  // // Ref to attach to the audio element
  // const audioRef = useRef(null);

  // // State to manage playing state
  // const [isPlaying, setIsPlaying] = useState(false);

  // // Function to toggle music play/pause
  // const playMusic = () => {
  //   audioRef.current.play();
  // };

  useEffect(() => {
    setOptions(["galxe-campaigns", "bodhi-text-contents"]);
  }, []);

  const searchBodhiDataset = async () => {
    console.log("searchPrompt:" + searchPrompt);
    const response = await fetch("https://embedding-search.deno.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: searchPrompt,
      }),
      // mode: "no-cors",
    });
    const data = await response.json();
    // { item_id: 16 }
    console.log("data:", data);

    // 1. setItemId
    // setItemId(data.item_id);
    console.log("item_id: " + data.item_id);

    // 3. query for data
    const response2 = await fetch("https://query-bodhi-user-search.deno.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.item_id,
      }),
      // mode: "no-cors",
    });
    const data2 = await response2.json();
    console.log("data2: ", data2);

    if (data2.resp.data.length === 0) {
      setRes([]);
      setIsEmpty(true);
      return;
    }

    const res1: resultByDataset = {
      dataset_id: "bodhi-text-contents",
      results: data2.resp.data.map((item: { uuid: any; data: any; metadata: any }) => {
        return {
          id: item.uuid,
          data: item.data,
          // { creator: '***', id: '***', type: '***' }
          metadata: item.metadata,
        };
      }),
    };
    console.log("res1: ", res1);
    // console.log(data.result.similarities);
    setRes([res1]);
    setIsEmpty(false);
  };

  const searchDataset = async (dataset: string) => {
    console.log("search from:" + dataset);
    console.log("searchPrompt:" + searchPrompt);
    const response = await fetch("https://search-e-from-datasets.deno.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: searchPrompt,
        dataset: dataset,
      }),
      // mode: "no-cors",
    });
    const data = await response.json();
    // { item_id: 15 }
    console.log("data:", data);

    // 1. setItemId
    // setItemId(data.item_id);
    console.log("item_id: " + data.item_id);

    // 2. wait 1 sec
    await timeout(1000);

    // 3. query for data
    const response2 = await fetch("https://query-user-search.deno.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.item_id,
      }),
      // mode: "no-cors",
    });
    const data2 = await response2.json();
    console.log("full data: ", data2);

    if (data2.resp.data.length === 0) {
      setRes([]);
      setIsEmpty(true);
      return;
    }

    const res1: resultByDataset = {
      dataset_id: dataset,
      results: data2.resp.data.map((item: { uuid: any; data: any; metadata: any }) => {
        return {
          id: item.uuid,
          data: item.data,
          // { unique_id: "GCU8jUP7RS", chain_name: "bnb-chain" }
          metadata: item.metadata,
        };
      }),
    };
    console.log("res1: ", res1);
    // console.log(data.result.similarities);
    setRes([res1]);
    setIsEmpty(false);
  };

  const handleOnClick = async () => {
    // 0. get dataset.
    // 1. request a search item at deno.
    // 2. wait for 1 sec to query the result.
    // 3. TODO: give a process line when waiting.
    // 4. return as a list.
    setSearching(true);
    console.log("dataset now:" + dataset);
    switch (dataset) {
      case "bodhi-text-contents":
        await searchBodhiDataset();
        break;
      default:
        await searchDataset(dataset);
    }
    setSearching(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center pt-20 space-x-2">
        <Image src="/assets/prompt-light.png" width={40} height={40} alt="prompt" />
        <span className="text-[22px] font-poppins font-bold dark:text-light-deep">MoveSpace AI EXPLORER</span>
      </div>
      <div className="pt-8 text-sm font-medium text-light-gray font-poppins dark:text-dark-gray">
        AI-powered data search explorer & data labeling platform
      </div>
      <div className="search-bar mt-9 w-[600px] h-[42px] py-2 px-4 flex justify-between items-center rounded-full bg-light-gray2 dark:bg-dark-gray2 dark:border dark:border-dark3">
        <div className="flex items-center h-full search-input">
          <Image src="/svg/search.svg" width={12.5} height={12.5} alt="search" />
          <input
            className="h-full p-0 pl-2 text-sm font-semibold w-input font-poppins dark:bg-opacity-0 dark:text-dark-gray input input-ghost focus:ring-0 focus:outline-none focus:bg-light-gray2 focus:dark:bg-opacity-0 focus:dark:text-dark-gray placeholder:text-light-gray placeholder:dark:text-dark-gray"
            value={searchPrompt}
            onChange={e => {
              setSearchPrompt(e.target.value);
            }}
            onKeyDown={handleEnterPress}
            placeholder="Enter your prompt to search"
          />
        </div>
        <div className="flex items-center h-full space-x-2 text-[10px] font-poppins search-confirm">
          {!datasetList ? (
            <div className="relative w-32" onClick={() => setShowSelect(!showSelect)}>
              <button
                type="button"
                className="relative flex items-center justify-between w-full h-6 pr-1 bg-white rounded dark:bg-dark-deep ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gradFrom dark:ring-light-gray dark:focus:ring-light-gray"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
              >
                <span className="flex items-center justify-center flex-grow py-1 dark:text-dark-gray3">
                  {options[selectedOption]}
                </span>
                <span className="flex items-center">
                  <SvgSelectDown className={`text-light-gray3 ${showSelect && "rotate-180"}`} />
                </span>
              </button>
              {showSelect && (
                <ul
                  className="absolute z-10 w-full py-1 px-0.5 flex flex-col space-y-0.5 mt-1 overflow-auto bg-white dark:bg-dark-deep rounded max-h-28 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="listbox"
                  aria-labelledby="listbox-label"
                  aria-activedescendant="listbox-option-3"
                >
                  {options.map((option, index) => (
                    <li
                      className="box-border relative flex items-center justify-between px-2 py-1 text-gray-900 rounded cursor-default select-none dark:text-light-gray3 hover:border hover:border-purple hover:bg-purple-light dark:hover:text-white dark:hover:bg-opacity-0"
                      id="listbox-option-0"
                      role="option"
                      key={index}
                      onClick={() => {
                        setSelectedOption(index);
                        setDataset(option);
                      }}
                    >
                      <div className="flex items-center">{option}</div>
                      {selectedOption === index && <SvgSelected className="dark:text-purple-dark" />}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <input
              className="input join-item"
              value={dataset}
              onChange={e => {
                setDataset(e.target.value);
              }}
              placeholder="Pls input the public dataset name"
            />
          )}
          {!searching && (
            <div
              className={`w-6 h-6 p-1 rounded ${
                !searchPrompt ? "bg-enter-bg dark:bg-enter-bg-dark" : "bg-gradient-to-r from-gradFrom to-gradTo"
              }`}
              onClick={() => {
                if (searchPrompt) {
                  handleOnClick();
                }
              }}
            >
              {!theme || theme === "light" ? (
                <Image className="cursor-pointer" src="/svg/enter.svg" width={18} height={18} alt="enter" />
              ) : (
                <Image src="/svg/enter-dark.svg" width={18} height={18} alt="enter" />
              )}
            </div>
          )}
          {searching && <SvgLoading className="w-6 h-6 animate-spin text-dark3" />}
        </div>
      </div>
      <div className="flex items-start justify-between mx-auto space-x-5 pt-9 w-base font-poppins">
        <Image src="/assets/prompt-blue.png" width={40} height={40} alt="prompt" />
        <div className="w-full h-[678px] px-[70px] py-8 overflow-y-scroll bg-white dark:bg-dark-deep dark:text-dark3">
          {/* 如果搜索后 res 数组元素数为0，则显示 No data found. Please try with another keyword. */}
          {isEmpty && (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <span className="text-xl font-semibold text-light-gray font-poppins">
                No data found. Please try with another keyword.
              </span>
            </div>
          )}
          {res.map((r, index) => (
            <div key={index} className="">
              {r.results.map((item, index2) => (
                <div
                  key={index2}
                  className="group flex flex-col py-4 space-y-4 border-b border-[#E2E8F066] last:border-none text-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-bold">Data</span>
                    <span className="font-medium leading-relaxed">{item.data}</span>
                  </div>
                  <div className="flex flex-col space-y-4">
                    {dataset === "bodhi-text-contents" ? (
                      <>
                        <div className="flex flex-col space-y-2">
                          <span className="font-bold">Metadata</span>
                          <span>{JSON.stringify(item.metadata)}</span>
                          <span>
                            <span>Bodhi ID(view the full content in Bodhi👉): </span>
                            <a href={"https://bodhi.wtf/" + item.metadata.id} target="_blank" rel="noreferrer">
                              <span className="px-3 py-1 rounded-lg bg-light-gray2 dark:bg-dark">
                                {item.metadata.id}
                              </span>
                            </a>
                          </span>
                          <span>Type: {item.metadata.type}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">id in vectorDB</span>
                          <span>{item.id}</span>
                        </div>
                        <div className="flex items-center space-x-20">
                          <Link href={`/tag?contract_name=bodhi&item_id=${item.id}`}>
                            <span className="flex items-center h-10 px-3 py-2 space-x-2 text-xs font-semibold border border-gray-200 border-solid rounded-full dark:border-dark3">
                              <SvgLabel />
                              <span>Label this item</span>
                            </span>
                          </Link>
                        </div>
                      </>
                    ) : dataset === "galxe-campaigns" ? (
                      <>
                        <div className="flex flex-col">
                          <span className="font-bold">Metadata</span>
                          <span>{JSON.stringify(item.metadata)}</span>
                        </div>
                        <span>Chain Name: {item.metadata.chain_name}</span>
                        <div className="flex items-center space-x-20">
                          <div className="flex items-center justify-between h-10 px-4 space-x-4 bg-gray-100 rounded-full w-80 search-input dark:bg-dark dark:border dark:border-dark3">
                            <div className="flex items-center flex-grow">
                              <Image src="/svg/search.svg" width={12} height={12} alt="search" />
                              <input
                                className="w-full h-full p-0 pl-1 text-xs font-semibold input input-ghost focus:ring-0 focus:outline-none focus:bg-light-gray2 dark:bg-dark dark:text-dark-gray dark:focus:bg-dark placeholder:text-light-gray placeholder:dark:text-dark-gray"
                                value={searchPrompt2}
                                onChange={e => {
                                  setSearchPrompt2(e.target.value);
                                }}
                                onKeyDown={handleEnterPress}
                                placeholder="Search Similiar Campaigns in the explorer!:"
                              />
                            </div>
                            <div
                              className={`w-6 h-6 p-1 rounded ${
                                !searchPrompt2
                                  ? "bg-enter-bg dark:bg-enter-bg-dark"
                                  : "bg-gradient-to-r from-gradFrom to-gradTo"
                              }`}
                              onClick={() => {
                                if (searchPrompt2) {
                                  handleOnClick();
                                }
                              }}
                            >
                              {!theme || theme === "light" ? (
                                <Image
                                  className="cursor-pointer"
                                  src="/svg/enter.svg"
                                  width={16}
                                  height={16}
                                  alt="enter"
                                />
                              ) : (
                                <Image src="/svg/enter-dark.svg" width={16} height={16} alt="enter" />
                              )}
                            </div>
                          </div>
                          <Link href={`/tag?contract_name=galxe-campaigns&item_id=${item.id}`}>
                            <span className="flex items-center h-10 px-3 py-2 space-x-2 text-xs font-semibold border border-gray-200 border-solid rounded-full dark:border-dark3">
                              <SvgLabel />
                              <span>Label this item</span>
                            </span>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <span>{JSON.stringify(item.metadata)}</span>
                        <span className="font-bold">Metadata</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ETHSpace;
