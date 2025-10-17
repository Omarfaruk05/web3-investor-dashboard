'use client';

import { ConnectWallet } from '@/components/ConnectWallet';
import OwnedProperties from '@/components/OwnedProperties';
import { useAccount, useBalance, useBlockNumber } from 'wagmi';

export default function Dashboard() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: blockNumber } = useBlockNumber({ query: { enabled: true, refetchInterval: 10000 } });

  return (
    <main className="min-h-screen p-8">
      <header className="flex flex-col justify-between items-center gap-12">
        <h1 className="text-3xl font-bold">Crypto City Dashboard</h1>
        <ConnectWallet />
      </header>

      {isConnected ? (
        <div className="grid gap-6 mt-12">
          {/* Network Info */}
          <div className="p-4 border border-gray-500 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Network</h2>
            <p>Chain: {chain?.name}</p>
            <p>Block: {blockNumber?.toString()}</p>
          </div>

          {/* Balance */}
          <div className="p-4 border border-gray-500 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Wallet</h2>
            <p>Address: {address}</p>
            <p>Balance: {balance?.formatted} {balance?.symbol}</p>
          </div>

          {/* Property Portfolio */}
          <div className="p-4 border border-gray-500 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Property Portfolio</h2>
            <OwnedProperties />
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">
            Connect your wallet to view your real estate portfolio
          </h2>
          <p className="text-gray-600">
            Track your tokenized properties, returns, and investment performance
          </p>
        </div>
      )}
    </main>
  );
}