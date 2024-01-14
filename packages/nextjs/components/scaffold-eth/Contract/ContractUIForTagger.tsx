import { useReducer, useState } from "react";
import { ContractVariables } from "./ContractVariables";
import { parseEther } from "viem";
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

export const ContractUIForTagger = ({
  contractName,
  itemId,
  content = "",
  metadata = "",
  className = "",
}: ContractUIProps) => {
  const [refreshDisplayVariables] = useReducer(value => !value, false);
  const configuredNetwork = getTargetNetwork();

  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName);

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

  const tags = [
    "String uuid xxx",
    "string meta data xxx",
    "KEYWORD 3",
    "KEYWORD 4",
    "String uuid xxx",
    "string meta data xxx",
    "KEYWORD 3",
    "KEYWORD 4",
  ];

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
            <span>{JSON.stringify(metadata)}</span>
          </span>
        </div>
        <div className="flex flex-col p-8 space-y-4 bg-white pr-36 rounded-2xl dark:bg-dark-deep">
          <span className="font-semibold text-dark-gray3">tagItem</span>
          <div className="flex items-center space-x-6">
            <input
              type="text"
              onChange={e => {
                setTag(e.target.value);
              }}
              placeholder="Enter your text"
              className="px-4 py-2 text-sm font-semibold bg-light w-96 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-dark"
            />
            <div
              onClick={() => {
                tagItem(itemId, tag);
              }}
              className="px-4 py-2 text-sm font-medium text-white rounded cursor-pointer bg-gradient-to-r from-gradFrom to-gradTo dark:text-dark"
            >
              Add
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 p-4 pb-12 rounded bg-card dark:bg-[#1B1B1B]">
            {tags.map((tag, index) => (
              <span
                className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white rounded bg-gradFrom dark:text-dark"
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