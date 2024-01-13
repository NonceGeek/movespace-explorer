import { useReducer, useState } from "react";
import { ContractVariables } from "./ContractVariables";
import { parseEther } from "viem";
import { Spinner } from "~~/components/assets/Spinner";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

type ContractUIProps = {
  contractName: ContractName;
  className?: string;
  itemId: string;
};

/**
 * UI component to interface with deployed contracts.
 **/
export const ContractUIForBodhiTagger = ({ contractName, itemId, className = "" }: ContractUIProps) => {
  const [refreshDisplayVariables] = useReducer(value => !value, false);
  const configuredNetwork = getTargetNetwork();
  // TODO: 下面的语句会执行12次，是什么原因？
  // console.log("🚀 ~ ContractUIForBodhiTagger ~ configuredNetwork:", configuredNetwork);

  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName);
  // console.log("🚀 ~ ContractUIForBodhiTagger ~ deployedContractLoading:", deployedContractLoading);
  // console.log("🚀 ~ ContractUIForBodhiTagger ~ deployedContractData:", deployedContractData);
  // const networkColor = useNetworkColor();

  const [tag, setTag] = useState("");

  /* smart contract interactor */
  const { writeAsync } = useScaffoldContractWrite({
    contractName: contractName,
    functionName: "tagItem",
    args: [itemId, tag],
    value: parseEther("0"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const tagItem = (itemId: string, theTag: string) => {
    setTag(theTag);
    writeAsync();
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
      <div className="flex flex-col space-y-6 w-card">
        {/* 第一个卡片 */}
        <div className="flex flex-col p-2.5 space-y-1 bg-white shadow-card rounded-2xl">
          <span className="text-sm font-bold text-dark-gray3">{contractName}</span>
          <Address address={deployedContractData.address} size="xs" />
          <div className="flex items-center space-x-2">
            <span className="text-xs font-normal text-light-gray">Balance:</span>
            <Balance address={deployedContractData.address} className="space-x-1 text-sm font-semibold text-dark2" />
          </div>
          {configuredNetwork && (
            <div className="flex items-center space-x-2">
              <span className="text-xs font-normal text-light-gray">Network:</span>
              <span className="text-sm font-semibold text-dark2">{configuredNetwork.name}</span>
            </div>
          )}
        </div>
        {/* 第二个卡片 */}
        <div className="flex flex-col p-2.5 space-y-1 bg-card shadow-card rounded-2xl">
          <ContractVariables
            refreshDisplayVariables={refreshDisplayVariables}
            deployedContractData={deployedContractData}
          />
        </div>
      </div>
      {/* 中间主要区域 */}
      <div className="flex flex-col col-span-1 gap-6 lg:col-span-2">
        <p>
          <b>Tag:</b> {itemId}
          <br></br>
          <b>Tag Format:</b>{" "}
          {JSON.stringify({
            keyword_1: "keyword_1",
            keyword_2: "keyword_2",
            keyword_3: "keyword_3",
            keyword_4: "keyword_4",
            keyword_5: "keyword_5",
          })}
          <br></br>
          <b>Content:</b> TODO
        </p>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            onChange={e => {
              setTag(e.target.value);
            }}
            placeholder="Enter your text"
            className="px-4 py-2 border rounded-l-lg w-96 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              tagItem(itemId, tag);
            }}
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-r-lg hover:bg-blue-700"
          >
            Tag it
          </button>
        </div>
      </div>
    </div>
  );
};
