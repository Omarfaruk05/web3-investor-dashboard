
'use client';

import { Property, useRealEstateToken } from '@/hooks/useRealEstateToken';
import { formatEther } from 'ethers';
import Link from 'next/link';
import { FaPlusSquare } from 'react-icons/fa';
import { useAccount } from 'wagmi';

export default function AllProperties() {
    const { address, isConnected } = useAccount();
    const { allProperties } = useRealEstateToken();

    // Mock mint function
    const handleMockMint = () => {
        alert('Local mint function - In a real app, this would call the contract');
        console.log('Would mint property for:', address);
    };

    if (!isConnected) {
        return (
            <div className="bg-gray-900 rounded-lg shadow-md p-6 text-center">
                <div className="max-w-md mx-auto">
                    <i className="fas fa-wallet text-6xl text-gray-300 mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect Your Wallet</h3>
                    <p className="text-gray-600">Please connect your wallet to view properties</p>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                            <strong>Test Account:</strong> Use any account from Hardhat (see terminal)
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold ">🏠 Real Estate Properties</h2>
                    <p className="text-gray-400 mt-1">
                        {allProperties?.length} propert{allProperties?.length === 1 ? 'y' : 'ies'} found
                        <span className="text-sm text-orange-600 ml-2">(Local Data)</span>
                    </p>
                </div>
               <Link href={"/add-property"}>
                    <button
                        // onClick={handleMockMint}
                        className="primary-button flex items-center gap-3"
                    >
                        <FaPlusSquare size={20} />
                        Mint Property (Local)
                    </button></Link>
            </div>

            {allProperties?.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No Properties Owned</h3>
                    <p className="text-gray-500 mb-4">
                        You don't own any properties in this test data
                    </p>

                </div>
            ) : (
                <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">All Properties ({allProperties?.length || 0})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allProperties?.map((property: Property) => (
                            <div key={property.tokenId.toString()} className="border border-gray-500 p-4 rounded-lg">
                                <h3 className="font-bold text-lg">{property.location}</h3>
                                <p>Type: {property.propertyType}</p>
                                <p>Area: {property.area.toString()} sq ft</p>
                                <p>Value: {formatEther(property.value)} ETH</p>
                                <p>Year Built: {property.yearBuilt.toString()}</p>
                                <p>Owner: {property.currentOwner.slice(0, 6)}...{property.currentOwner.slice(-4)}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className={`px-2 py-1 rounded ${property.isForSale ? 'bg-green-100 text-green-800' : 'bg-cyan-200 text-gray-800'
                                        }`}>
                                        {property.isForSale ? 'For Sale' : 'Not for Sale'}
                                    </span>
                                    {property.currentOwner.toLowerCase() === address?.toLowerCase() && (
                                        <button
                                            // onClick={() => handleToggleForSale(property.tokenId)}
                                            className="primary-button text-xs"
                                        >
                                            {property.isForSale ? 'Remove Sale' : 'Mark for Sale'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}