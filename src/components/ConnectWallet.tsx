'use client'

import Link from 'next/link'
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
                <Link
                    href={"/all-property"}
                    className="primary-button"
                >
                    All Properties
                </Link>
                <button
                    onClick={() => disconnect()}
                    className="font-semibold px-6 py-3 bg-red-500 text-white rounded-lg"
                >
                    Disconnect
                </button>
            </div>
        )
    }

    return (
        <div className="flex gap-4">
            {connectors.map((connector) => (
                <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    className="primary-button"
                >
                    Connect {connector.name}
                </button>
            ))}
        </div>
    )
}