import { useEffect } from "react";
import { Abi, AbiFunction } from "abitype";
import { Address } from "viem";
import { useContractRead } from "wagmi";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { displayTxResult } from "~~/components/scaffold-eth";
import { useAnimationConfig } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

type DisplayVariableProps = {
  contractAddress: Address;
  abiFunction: AbiFunction;
  refreshDisplayVariables: boolean;
};

export const DisplayVariable = ({ contractAddress, abiFunction, refreshDisplayVariables }: DisplayVariableProps) => {
  const {
    data: result,
    isFetching,
    refetch,
  } = useContractRead({
    address: contractAddress,
    functionName: abiFunction.name,
    abi: [abiFunction] as Abi,
    onError: error => {
      notification.error(error.message);
    },
  });

  const { showAnimation } = useAnimationConfig(result);

  useEffect(() => {
    refetch();
  }, [refetch, refreshDisplayVariables]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-1">
        <div className="text-sm break-all text-dark-gray3">{abiFunction.name}</div>
        <button className="btn btn-ghost btn-xs" onClick={async () => await refetch()}>
          {isFetching ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <ArrowPathIcon className="w-3 h-3 cursor-pointer" aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="flex flex-col text-sm font-semibold text-dark2">
        <div
          className={`break-all block transition bg-transparent ${
            showAnimation ? "bg-warning rounded-sm animate-pulse-fast" : ""
          }`}
        >
          {displayTxResult(result)}
        </div>
      </div>
    </div>
  );
};
