import { useRealEstateToken, Property } from '../hooks/useRealEstateToken'
import { useAccount, useConnect } from 'wagmi'
import { useState } from 'react'
import { ethers } from 'ethers'

export const RealEstateDashboard = () => {
    const { address, isConnected } = useAccount()
    const { connect, connectors } = useConnect()
    const {
        allProperties,
        ownedProperties,
        propertiesForSale,
        isOwner,
        mintProperty,
        toggleForSale,
        isConfirming,
        isConfirmed,
        refetchProperties,
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

    const handleToggleForSale = async (tokenId: bigint) => {
        await toggleForSale(tokenId)
    }

    const formatEther = (value: bigint) => {
        return ethers.formatEther(value)
    }

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Real Estate Token Platform</h1>
                    <button
                        onClick={() => connect({ connector: connectors[0] })}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Real Estate Token Platform</h1>
                    <div className="text-sm bg-white p-2 rounded">
                        Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                        {isOwner && <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded">Owner</span>}
                    </div>
                </div>

                {isConfirming && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                        Transaction confirming...
                    </div>
                )}

                {isConfirmed && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        Transaction confirmed!
                    </div>
                )}

                {isOwner && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-bold mb-4">Mint New Property</h2>
                        <form onSubmit={handleMintProperty} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Token URI"
                                value={mintForm.tokenURI}
                                onChange={(e) => setMintForm({ ...mintForm, tokenURI: e.target.value })}
                                className="border p-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={mintForm.location}
                                onChange={(e) => setMintForm({ ...mintForm, location: e.target.value })}
                                className="border p-2 rounded"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Area (sq ft)"
                                value={mintForm.area}
                                onChange={(e) => setMintForm({ ...mintForm, area: e.target.value })}
                                className="border p-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Value (ETH)"
                                value={mintForm.value}
                                onChange={(e) => setMintForm({ ...mintForm, value: e.target.value })}
                                className="border p-2 rounded"
                                required
                            />
                            <select
                                value={mintForm.propertyType}
                                onChange={(e) => setMintForm({ ...mintForm, propertyType: e.target.value })}
                                className="border p-2 rounded"
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
                                className="border p-2 rounded"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isConfirming}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded col-span-2"
                            >
                                {isConfirming ? 'Minting...' : 'Mint Property'}
                            </button>
                        </form>
                    </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">All Properties ({allProperties?.length || 0})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allProperties?.map((property: Property) => (
                            <div key={property.tokenId.toString()} className="border p-4 rounded-lg">
                                <h3 className="font-bold text-lg">{property.location}</h3>
                                <p>Type: {property.propertyType}</p>
                                <p>Area: {property.area.toString()} sq ft</p>
                                <p>Value: {formatEther(property.value)} ETH</p>
                                <p>Year Built: {property.yearBuilt.toString()}</p>
                                <p>Owner: {property.currentOwner.slice(0, 6)}...{property.currentOwner.slice(-4)}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className={`px-2 py-1 rounded ${property.isForSale ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {property.isForSale ? 'For Sale' : 'Not for Sale'}
                                    </span>
                                    {property.currentOwner.toLowerCase() === address?.toLowerCase() && (
                                        <button
                                            onClick={() => handleToggleForSale(property.tokenId)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded"
                                        >
                                            {property.isForSale ? 'Remove Sale' : 'Mark for Sale'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}