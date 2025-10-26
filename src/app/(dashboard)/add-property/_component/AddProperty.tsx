'use client'

import { useRealEstateToken } from "@/hooks/useRealEstateToken"
import { useState } from "react"
import { useAccount, useConnect } from "wagmi"

export default function AddProperty() {
        const { address, isConnected } = useAccount()
        const {
            mintProperty,       
            isConfirming,
        } = useRealEstateToken()
    
        const [mintForm, setMintForm] = useState({
            tokenURI: '',
            location: '',
            area: '',
            value: '',
            propertyType: 'residential',
            yearBuilt: '',
        })
    
        const handleMintProperty = async (e: React.FormEvent) => {
            e.preventDefault()
            if (!address) return
    
            await mintProperty(
                address,
                mintForm.tokenURI,
                mintForm.location,
                parseInt(mintForm.area),
                mintForm.value,
                mintForm.propertyType,
                parseInt(mintForm.yearBuilt)
            )
    
            // Reset form
            setMintForm({
                tokenURI: '',
                location: '',
                area: '',
                value: '',
                propertyType: 'residential',
                yearBuilt: '',
            })
        }
    
    if (!isConnected) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                <p className="text-gray-600">Please connect your wallet to mint properties</p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                        <strong>Test Account:</strong> Use any account from Hardhat (see terminal)
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Mint New Property</h2>
            <form onSubmit={handleMintProperty} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Token URI"
                    value={mintForm.tokenURI}
                    onChange={(e) => setMintForm({ ...mintForm, tokenURI: e.target.value })}
                    className="border border-gray-500 p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={mintForm.location}
                    onChange={(e) => setMintForm({ ...mintForm, location: e.target.value })}
                    className="border border-gray-500 p-2 rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Area (sq ft)"
                    value={mintForm.area}
                    onChange={(e) => setMintForm({ ...mintForm, area: e.target.value })}
                    className="border border-gray-500 p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Value (ETH)"
                    value={mintForm.value}
                    onChange={(e) => setMintForm({ ...mintForm, value: e.target.value })}
                    className="border border-gray-500 p-2 rounded"
                    required
                />
                <select
                    value={mintForm.propertyType}
                    onChange={(e) => setMintForm({ ...mintForm, propertyType: e.target.value })}
                    className="bg-gray-900 border border-gray-500 p-2 rounded"
                >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                </select>
                <input
                    type="number"
                    placeholder="Year Built"
                    value={mintForm.yearBuilt}
                    onChange={(e) => setMintForm({ ...mintForm, yearBuilt: e.target.value })}
                    className="border border-gray-500 p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    disabled={isConfirming}
                    className="primary-button col-span-2"
                >
                    {isConfirming ? 'Minting...' : 'Mint Property'}
                </button>
            </form>
        </div>
    )
}