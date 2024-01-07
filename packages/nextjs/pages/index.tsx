import { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
// import { type } from "os";
import ReactMarkdown from "react-markdown";

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
  metadata: {};
};

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

const ETHSpace: NextPage = () => {
  //在对后端发起请求后，将response的内容保存在results中
  //如果用户选择使用mixed模式，则使用resultByDataset来记录结果
  const [res, setRes] = useState<resultByDataset[]>([]);
  //设置默认是在我们提供的数据集而不是公共数据集中查询
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [datasetList, _setDatasetList] = useState(false);
  //获取目前提供的数据集选项
  const [options, setOptions] = useState<string[]>([]);
  const [itemId, setItemId] = useState<number>();
  //获取用户选择的数据集
  const [dataset, setDataset] = useState("galxe-campaigns");
  //获取用户搜索的prompt
  const [searchPrompt, setSearchPrompt] = useState("");
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
    console.log("data:", data);

    // 1. setItemId
    setItemId(data.item_id);
    console.log("item_id: " + data.item_id);

    // 2. wait 1 sec
    await timeout(1000);

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

    const res1: resultByDataset = {
      dataset_id: "bodhi-text-contents",
      results: data2.resp.data.map((item: { uuid: any; data: any; metadata: any }) => {
        return {
          id: item.uuid,
          data: item.data,
          metadata: item.metadata,
        };
      }),
    };
    console.log("res1: ", res1);
    // console.log(data.result.similarities);
    setRes([res1]);
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
    console.log("data:", data);

    // 1. setItemId
    setItemId(data.item_id);
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
    console.log("fully data: ", data2);

    const res1: resultByDataset = {
      dataset_id: dataset,
      results: data2.resp.data.map((item: { uuid: any; data: any; metadata: any }) => {
        return {
          id: item.uuid,
          data: item.data,
          metadata: item.metadata,
        };
      }),
    };
    console.log("res1: ", res1);
    // console.log(data.result.similarities);
    setRes([res1]);
  };

  const handleOnClick = async () => {
    // 0. get dataset.
    // 1. request a search item at deno.
    // 2. wait for 1 sec to query the result.
    // 3. TODO: give a process line when waiting.
    // 4. return as a list.
    console.log("dataset now:" + dataset);
    switch (dataset) {
      case "bodhi-text-contents":
        searchBodhiDataset();
      default:
        searchDataset(dataset);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center pt-20 space-x-2">
        <Image src="/assets/prompt-light.png" width={40} height={40} alt="prompt" />
        <span className="text-[22px] font-bold">AI EXPLORER</span>
      </div>
      <div className="pt-8 text-[#2626268F]">
        Full Dimension Content Search & Tagger App based on AI for Web2/Web3 Data Source
      </div>
      <div className="search-bar mt-9 w-[600px] h-[42px] py-2 px-4 flex justify-between items-center rounded-full bg-[#F0F2F5]">
        <div className="flex items-center h-full search-input">
          <Image src="/svg/search.svg" width={12.5} height={12.5} alt="search" />
          <input
            className="w-[380px] h-full p-0 pl-2 input input-ghost focus:ring-0 focus:outline-none focus:bg-[#F0F2F5]"
            value={searchPrompt}
            onChange={e => {
              setSearchPrompt(e.target.value);
            }}
            onKeyDown={handleEnterPress}
            placeholder="Enter your prompt to search"
          />
        </div>
        <div className="flex items-center h-full space-x-2 search-confirm">
          {!datasetList ? (
            <select
              className="h-full rounded-[4px] text-xs focus-visible:outline-none py-1 px-2"
              onChange={e => {
                setDataset(e.target.value);
              }}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
          {searchPrompt ? (
            <Image src="/assets/enter.png" width={26} height={26} alt="enter" onClick={handleOnClick} />
          ) : (
            <Image src="/assets/enter-disabled.png" width={26} height={26} alt="enter" />
          )}
        </div>
      </div>
      <div className="mx-auto w-4/5 max-h-[600px] backdrop-blur-lg backdrop-filter p-10 m-10 rounded-lg opacity-80 shadow-md overflow-auto overflow-y-auto">
        <h2 className="mb-1 text-4xl font-bold">Search Results</h2>
        <div>
          {res.map((r, index) => (
            <div key={index} className="m-5 overflow-x-auto collapse collapse-open bg-base-200">
              <input type="checkbox" className="peer" />
              <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                Results from {dataset}
              </div>
              <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                {r.results.map((item, index) => (
                  <div key={index}>
                    <div className="divider"></div>
                    <span className="text-xl">Data</span>
                    <div>
                      <ReactMarkdown>{item.data}</ReactMarkdown>
                    </div>
                    {dataset === "bodhi-text-contents" ? (
                      <div>
                        <span className="text-xl">Metadata</span>
                        <pre className="text-base">{JSON.stringify(item.metadata)}</pre>
                        <pre className="text-base">
                          <b>Bodhi ID(view the full content in Bodhi👉): </b>
                          <a href={"https://bodhi.wtf/" + item.metadata.id} target="_blank" rel="noreferrer">
                            <button className="btn join-item">{item.metadata.id}</button>
                          </a>
                        </pre>
                        <pre className="text-base">
                          <b>Type: </b>
                          {item.metadata.type}
                        </pre>
                        <br></br>
                        <span className="text-xl">id in vectorDB</span>
                        <pre className="text-base">
                          <b>{item.id}</b>
                        </pre>
                        <br></br>
                      </div>
                    ) : dataset === "galxe-campaigns" ? (
                      <div>
                        <span className="text-xl">Metadata</span>
                        <pre className="text-base">{JSON.stringify(item.metadata)}</pre>
                        <pre className="text-base">
                          <b>Chain Name: </b>
                          {item.metadata.chain_name}
                        </pre>
                        <pre className="text-base">
                          <b>Search Similiar Campaigns in the explorer!: </b>
                          <a href="https://galxe.com/explore#all" target="_blank" rel="noreferrer">
                            <button className="btn join-item">Search</button>
                          </a>
                        </pre>
                        <br></br>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xl">Metadata</span>
                        <pre className="text-base">{JSON.stringify(item.metadata)}</pre>
                        <br></br>
                      </div>
                    )}
                    <a href={"/debug?uuid=" + item.id} target="_blank" rel="noreferrer">
                      <button className="btn join-item">Tag this item!(Comming Soon..)</button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ETHSpace;