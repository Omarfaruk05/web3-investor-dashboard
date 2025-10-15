'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ConnectWallet() {
    const { address, isConnected } = useAccount()
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect()

    if (isConnected) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-sm">
                    Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button
                    onClick={() => disconnect()}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Disconnect
                </button>
            </div>
        )
    }

    return (
        <div className="flex gap-2">
            {connectors.map((connector) => (
                <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Connect {connector.name}
                </button>
            ))}
        </div>
    )
}