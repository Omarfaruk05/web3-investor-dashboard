'use client';

import { useAccount, useContractRead } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract';

export default function OwnedProperties() {
    const { address, isConnected } = useAccount();


    const { data: balance, isLoading, refetch } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'balanceOf',
        args: [address],
    });


    return (
        <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-2">Your Properties</h2>
            {!isConnected ? (
                <p>Please connect your wallet.</p>
            ) : isLoading ? (
                <p>Loading...</p>
            ) : (
                <p>You own {balance?.toString() || 0} properties.</p>
            )}
        </div>
    );
}