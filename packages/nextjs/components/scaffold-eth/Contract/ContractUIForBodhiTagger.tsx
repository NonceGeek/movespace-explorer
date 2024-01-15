import { useEffect, useReducer, useState } from "react";
import { ContractVariables } from "./ContractVariables";
import { parseEther } from "viem";
import { GradientBorderButton } from "~~/components/GradientBorderButton";
import { Spinner } from "~~/components/assets/Spinner";
import { Address, Balance } from "~~/components/scaffold-eth";
import { SvgClose } from "~~/components/svg/Close";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

type ContractUIProps = {
  contractName: ContractName;
  className?: string;
  itemId: string;
  content: string;
  metadata: string;
};

/**
 * UI component to interact with deployed contracts.
 * TODO: Bodhi should be specific.
 **/

export const ContractUIForBodhiTagger = ({
  contractName,
  itemId,
  content = "",
  metadata = "",
  className = "",
}: ContractUIProps) => {
  const [refreshDisplayVariables] = useReducer(value => !value, false);
  const configuredNetwork = getTargetNetwork();

  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName);

  // 输入框中的 tag
  const [tag, setTag] = useState("");
  // 标记 tagJson 是否已经设置，已设置才调用 writeAsync
  const [isTagSet, setIsTagSet] = useState(false);
  const [tags, setTags] = useState([]);
  // writeAsync 的参数，保存规范化后的 tag 列表
  const [tagJson, setTagJson] = useState("");

  useEffect(() => {
    if (isTagSet) {
      writeAsync();
    }
  }, [isTagSet]);

  /* smart contract interactor */
  const { writeAsync } = useScaffoldContractWrite({
    contractName: contractName,
    functionName: "tagItem",
    args: [itemId, tagJson],
    value: parseEther("0"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      setIsTagSet(false);
    },
  });

  const tagItem = () => {
    // iterate over tags to build json with format: { keyword_1: tagName_1, keyword_2: tagName_2, ... }
    const tempTagJson: { [key: string]: string } = {};
    tags.forEach((tag, index) => {
      tempTagJson[`keyword_${index + 1}`] = tag;
    });
    setTagJson(JSON.stringify(tempTagJson));
    setIsTagSet(true);
  };

  const addToTags = () => {
    if (!tag) {
      return;
    }

    setTags([tag, ...tags]);
    setTag("");
  };

  if (deployedContractLoading) {
    return (
      <div className="mt-14">
        <Spinner width="50px" height="50px" />
      </div>
    );
  }

  if (!deployedContractData) {
    return (
      <p className="text-3xl mt-14">
        {`No contract found by the name of "${contractName}" on chain "${configuredNetwork.name}"!`}
      </p>
    );
  }

  return (
    <div className={`w-full flex space-x-10 ${className}`}>
      {/* 左侧栏 */}
      <div className="flex flex-col space-y-6 w-card shrink-0">
        {/* 第一个卡片 */}
        <div className="flex flex-col p-2.5 space-y-1 bg-white shadow-card rounded-2xl dark:bg-dark-deep dark:shadow-none">
          <span className="text-sm font-bold text-dark-gray3">{contractName}</span>
          <Address address={deployedContractData.address} size="xs" />
          <div className="flex items-center space-x-2">
            <span className="text-xs font-normal text-light-gray dark:text-dark-gray">Balance:</span>
            <Balance
              address={deployedContractData.address}
              className="space-x-1 text-sm font-semibold text-dark2 dark:text-dark3"
            />
          </div>
          {configuredNetwork && (
            <div className="flex items-center space-x-2">
              <span className="text-xs font-normal text-light-gray dark:text-dark-gray">Network:</span>
              <span className="text-sm font-semibold text-dark2 dark:text-dark3">{configuredNetwork.name}</span>
            </div>
          )}
        </div>
        {/* 第二个卡片 */}
        <div className="flex flex-col p-2.5 space-y-1 bg-card shadow-card rounded-2xl dark:bg-dark dark:shadow-none">
          <ContractVariables
            refreshDisplayVariables={refreshDisplayVariables}
            deployedContractData={deployedContractData}
          />
        </div>
      </div>
      {/* 中间主要区域 */}
      <div className="flex flex-col w-full space-y-9">
        <div className="flex flex-col p-8 space-y-2 text-xl font-medium bg-white rounded-2xl dark:bg-dark-deep dark:text-white">
          <span className="flex items-center space-x-2">
            <span className="font-semibold">Tag:</span>
            <span>{itemId}</span>
          </span>
          <span className="flex items-center space-x-2">
            <span className="font-semibold">Content:</span>
            <span>{content}</span>
          </span>
          <span className="flex items-center space-x-2">
            <span className="font-semibold">Metadata Default:</span>
          </span>
          <span className="flex items-center space-x-2">
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Key</th>
                  <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(metadata).map(([key, value]) => (
                  <tr key={key}>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{key}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {typeof value === "object" ? JSON.stringify(value) : value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </span>
        </div>
        <div className="flex flex-col p-8 space-y-4 bg-white pr-36 rounded-2xl dark:bg-dark-deep">
          <span className="font-semibold text-dark-gray3">tagItem</span>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={tag}
              onChange={e => {
                setTag(e.target.value);
              }}
              placeholder="Enter your text"
              className="px-4 py-2 text-sm font-semibold w-96 bg-light focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-dark dark:text-dark3"
            />
            <div
              onClick={addToTags}
              className="px-4 py-2 text-sm font-medium text-white rounded-full cursor-pointer bg-gradFrom dark:text-dark"
            >
              Add
            </div>
            <GradientBorderButton onClick={tagItem} btnText="Submit" smallSize={true} />
          </div>
          <div className="flex flex-wrap items-center gap-2 p-4 pb-12 rounded bg-card dark:bg-[#1B1B1B]">
            {tags.map((tag, index) => (
              <span
                className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white rounded-full bg-gradFrom dark:text-dark"
                key={index}
              >
                <span>{tag}</span>
                <SvgClose className="dark:text-dark" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
