import { useAccountBalance } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

type TBalanceProps = {
  address?: string;
  className?: string;
};

/**
 * Display (ETH & USD) balance of an ETH address.
 */
export const Balance = ({ address, className = "" }: TBalanceProps) => {
  const configuredNetwork = getTargetNetwork();
  const { balance, price, isError, isLoading, onToggleBalance, isEthBalance } = useAccountBalance(address);

  if (!address || isLoading || balance === null) {
    return (
      <div className="flex space-x-4 animate-pulse">
        <div className="w-6 h-6 rounded-md bg-slate-300"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 rounded w-28 bg-slate-300"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer`}>
        <div className="text-warning">Error</div>
      </div>
    );
  }

  return (
    <div className={`cursor-pointer ${className}`} onClick={onToggleBalance}>
      {isEthBalance ? (
        <>
          <span>{balance?.toFixed(4)}</span>
          <span>{configuredNetwork.nativeCurrency.symbol}</span>
        </>
      ) : (
        <>
          <span>$</span>
          <span>{(balance * price).toFixed(2)}</span>
        </>
      )}
    </div>
  );
};
