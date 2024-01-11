import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractUIForBodhiTagger } from "~~/components/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getContractNames } from "~~/utils/scaffold-eth/contractNames";

const selectedContractStorageKey = "scaffoldEth2.selectedContract";
const contractNames = getContractNames();

const Tag: NextPage = () => {
  //   variables about the tagger contract
  const [itemId, setItemId] = useState<string | null>("");
  const [contractName, setContractName] = useState<string | null>("");

  const [selectedContract, setSelectedContract] = useLocalStorage<ContractName>(
    selectedContractStorageKey,
    contractNames[0],
  );

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    console.log("🚀 ~ useEffect ~ queryParameters:", queryParameters);
    const itemId = queryParameters.get("item_id");
    console.log("🚀 ~ useEffect ~ itemId:", itemId);
    const contractN = queryParameters.get("contract_name");
    console.log("🚀 ~ useEffect ~ contractN:", contractN);
    setItemId(itemId);
    setContractName(contractN);
  }, []);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ selectedContract:", selectedContract);
    console.log("🚀 ~ useEffect ~ contractNames:", contractNames);
    if (!contractNames.includes(selectedContract)) {
      setSelectedContract(contractNames[0]);
    }
  }, [selectedContract, setSelectedContract]);

  return (
    <>
      <MetaHeader title="Tag Item | MoveSpace" description="Tag MoveSpace Items in Easy Way" />
      <div className="flex flex-col mx-auto w-content font-poppins">
        {contractNames.length === 0 ? (
          <p className="text-3xl mt-14">No contracts found!</p>
        ) : (
          <>
            {contractNames.length > 1 && (
              <div className="flex flex-row flex-wrap w-full gap-2 px-6 pb-1 max-w-7xl lg:px-10">
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

export default Tag;
