import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractUI } from "~~/components/scaffold-eth";
import { ContractUIForBodhiTagger } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getContractNames } from "~~/utils/scaffold-eth/contractNames";

const selectedContractStorageKey = "scaffoldEth2.selectedContract";
const contractNames = getContractNames();

const Debug: NextPage = () => {
  //   variables about the tagger contract
  const [itemId, setItemId] = useState<string | null>("");
  const [contractName, setContractName] = useState<string | null>("");

  const [selectedContract, setSelectedContract] = useLocalStorage<ContractName>(
    selectedContractStorageKey,
    contractNames[0],
  );

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const itemId = queryParameters.get("item_id");
    const contractN = queryParameters.get("contract_name");
    setItemId(itemId);
    setContractName(contractN);
  });
  useEffect(() => {
    if (!contractNames.includes(selectedContract)) {
      setSelectedContract(contractNames[0]);
    }
  }, [selectedContract, setSelectedContract]);

  return (
    <>
      <MetaHeader title="Tag Item | MoveSpace" description="Tag MoveSpace Items in Easy Way" />
      <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
        {contractNames.length === 0 ? (
          <p className="text-3xl mt-14">No contracts found!</p>
        ) : (
          <>
            {contractNames.length > 1 && (
              <div className="flex flex-row gap-2 w-full max-w-7xl pb-1 px-6 lg:px-10 flex-wrap">
                {contractNames.map(contractName => (
                  <button
                    className={`btn btn-secondary btn-sm normal-case font-thin ${
                      contractName === selectedContract ? "bg-base-300" : "bg-base-100"
                    }`}
                    key={contractName}
                    onClick={() => setSelectedContract(contractName)}
                  >
                    {contractName}
                  </button>
                ))}
              </div>
            )}

            {contractName === "bodhi"
              ? contractNames.map(contractName => (
                  <ContractUIForBodhiTagger
                    key={contractName}
                    contractName={contractName}
                    itemId={itemId}
                    className={contractName === selectedContract ? "" : "hidden"}
                  />
                ))
              : null}
          </>
        )}
      </div>
    </>
  );
};

export default Debug;
