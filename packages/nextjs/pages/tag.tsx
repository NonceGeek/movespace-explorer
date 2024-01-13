import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { Footer2 } from "~~/components/Footer2";
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
    const itemId = queryParameters.get("item_id");
    const contractN = queryParameters.get("contract_name");
    setItemId(itemId);
    setContractName(contractN);
  }, []);

  useEffect(() => {
    if (!contractNames.includes(selectedContract)) {
      setSelectedContract(contractNames[0]);
    }
  }, [selectedContract, setSelectedContract]);

  return (
    <>
      <MetaHeader title="Tag Item | MoveSpace" description="Tag MoveSpace Items in Easy Way" />
      <div className="flex flex-col pt-20 mx-auto w-content font-poppins">
        {contractNames.length === 0 && <p className="text-3xl mt-14">No contracts found!</p>}
        {contractName === "bodhi" &&
          contractNames.map(contractName => (
            <ContractUIForBodhiTagger
              key={contractName}
              contractName={contractName}
              itemId={itemId}
              className={contractName === selectedContract ? "" : "hidden"}
            />
          ))}
        <Footer2 />
      </div>
    </>
  );
};

export default Tag;
