import { useEffect, useRef, useState } from "react";
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
      console.log("Enter Enter Key! ");
      handleonClick();
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

  const handleonClick = async () => {
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
    <div className="grid flex-grow lg:grid-cols-2">
      {/* <audio ref={audioRef} src="/assets/egg.mp3" preload="metadata" /> */}
      <div className="min-h-screen hero bg-base-200 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold">🔎🤠 MoveSpace AI Explorer</h1>
            <p className="py-6">
              -- Full Dimension Content Search & Tagger App based on AI for Web2/Web3 Data Source.{" "}
            </p>
            <div className="mb-6 join">
              <div>
                <div>
                  {/* <button onClick={playMusic}>play music</button> */}

                  <input
                    style={{ width: "300px" }}
                    className="input input-bordered join-item"
                    value={searchPrompt}
                    onChange={e => {
                      setSearchPrompt(e.target.value);
                    }}
                    onKeyDown={handleEnterPress}
                    placeholder="Enter your prompt to search"
                  />
                </div>
              </div>
              <div>
                <div>
                  {!datasetList ? (
                    <select
                      className="select select-bordered join-item"
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
                      className="input input-bordered join-item"
                      value={dataset}
                      onChange={e => {
                        setDataset(e.target.value);
                      }}
                      placeholder="Pls input the public dataset name"
                    />
                  )}
                </div>
              </div>
              <div className="indicator">
                <button
                  className="btn join-item"
                  onClick={() => {
                    handleonClick();
                  }}
                >
                  🔎 Search
                </button>
              </div>
            </div>
            <div className="text-left hero-content">
              {/* <span className="text-sm">
                <p>
                  <b>Some search question examples: </b>
                </p>
                <p>* bitcoin</p>
                <p>* bodhi</p>
                <p>* leeduckgo</p>
              </span> */}
            </div>
            {/* <a href="https://bodhi.wtf/10586" target="_blank" rel="noreferrer">
              <button className="px-5 py-2 text-gray-800 bg-white border border-gray-400 rounded shadow w-96 hover:bg-gray-100">
                🤑 <b>Buy</b> shares to support explorer!
              </button>
            </a>
            <br></br>
            <a href="https://bodhi.wtf/13663" target="_blank" rel="noreferrer">
              <button className="px-5 py-2 text-gray-800 bg-white border border-gray-400 rounded shadow w-96 hover:bg-gray-100">
                📝 Blog for Explorer<b>(See the future plan)</b>
              </button>
            </a>
            <br></br>
            <a href="https://explorer.movespace.xyz" target="_blank" rel="noreferrer">
              <button className="px-5 py-2 text-gray-800 bg-white border border-gray-400 rounded shadow w-96 hover:bg-gray-100">
                <b>🛝 Go to MoveSpace Explorer</b>
              </button>
            </a>
            <br></br>
            <a href="https://random-hacker.deno.dev/" target="_blank" rel="noreferrer">
            <button className="px-5 py-2 text-gray-800 bg-white border border-gray-400 rounded shadow w-96 hover:bg-gray-100">
              👽 A Random <b>Indie Hacker</b>
            </button>
            </a>
            <br></br> */}
            <a href="https://twitter.com/movespacexyz" target="_blank" rel="noreferrer">
              <button className="px-5 py-2 text-gray-800 bg-white border border-gray-400 rounded shadow w-96 hover:bg-gray-100">
                ❤️ Follow my twitter! ❤️
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-green-500">
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
    </div>
  );
};

export default ETHSpace;
