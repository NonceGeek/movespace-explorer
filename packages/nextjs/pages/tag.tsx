import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { Footer2 } from "~~/components/Footer2";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractUIForBodhiTagger, ContractUIForTagger } from "~~/components/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getContractNames } from "~~/utils/scaffold-eth/contractNames";

const selectedContractStorageKey = "scaffoldEth2.selectedContract";
const contractNames = getContractNames();

const Tag: NextPage = () => {
  //   variables about the tagger contract
  const [itemId, setItemId] = useState<string | null>("");
  const [contractName, setContractName] = useState<string | null>("");

  const [data, setData] = useState("");
  const [metadata, setMetadata] = useState("");

  const [selectedContract, setSelectedContract] = useLocalStorage<ContractName>(
    selectedContractStorageKey,
    contractNames[0],
  );

  function selectDataset(dataset_name: string) {
    switch (dataset_name) {
      case "bodhi":
        return "bodhi_text_assets_k_v";
      case "galxe-campaigns":
        return "galxe_campaigns";
      default:
        return "opps";

    }
  }
  async function getItem(uuid: string, dataset_name: string) {
    const dataset_name_finally = selectDataset(dataset_name);
    console.log("uuid", uuid);
    const response = await fetch("https://query-item.deno.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: uuid,
        dataset_name: dataset_name_finally,
      }),
      // mode: "no-cors",
    });
    const resp = await response.json();
    console.log("resp", resp);
    setData(resp[0].data);
    setMetadata(resp[0].metadata);
  }

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const itemId = queryParameters.get("item_id");
    const contractN = queryParameters.get("contract_name");
    setItemId(itemId);
    setContractName(contractN);
    getItem(itemId, contractN);
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
          (
            <ContractUIForBodhiTagger
              key="BodhiItemTagger"
              contractName="BodhiItemTagger"
              itemId={itemId}
              content={data}
              metadata={metadata}
              className="BodhiItemTagger"
            />
          )}
        {contractName === "galxe-campaigns" &&
          (
            <ContractUIForTagger
              key="GalaxeItemTagger"
              contractName="GalaxeItemTagger"
              itemId={itemId}
              content={data}
              metadata={metadata}
              className="GalaxeItemTagger"
            />
          )}
        <Footer2 />
      </div>
    </>
  );
};

export default Tag;
