
'use client';

import { useMockProperties } from '@/hooks/useMockProperties';
import { FaPlus, FaPlusSquare } from 'react-icons/fa';
import { useAccount } from 'wagmi';

export default function PropertyListMock() {
    const { address, isConnected } = useAccount();
    const { properties, loading, totalCount } = useMockProperties();

    // Mock mint function
    const handleMockMint = () => {
        alert('Mock mint function - In a real app, this would call the contract');
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

    if (loading) {
        return (
            <div className="bg-gray-900 rounded-lg shadow-md p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="border border-gray-600 rounded-lg overflow-hidden">
                                <div className="h-48 bg-gray-800"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
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
                        {totalCount} propert{totalCount === 1 ? 'y' : 'ies'} found
                        <span className="text-sm text-orange-600 ml-2">(Mock Data)</span>
                    </p>
                </div>
                <button
                    onClick={handleMockMint}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                    <FaPlusSquare size={20} />
                    Mint Property (Mock)
                </button>
            </div>

            {properties.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No Properties Owned</h3>
                    <p className="text-gray-500 mb-4">
                        You don't own any properties in this test data
                    </p>

                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div key={property.tokenId.toString()} className="border border-gray-500 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-blue-50">
                            <div className="h-48 bg-gray-200 relative">
                                <img
                                    src={property.metadata.image}
                                    alt={property.metadata.name}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                    Owned
                                </span>
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                    {property.metadata.name}
                                </h3>

                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {property.metadata.description}
                                </p>

                                <div className="space-y-2 mb-4">
                                    {property.metadata.attributes.slice(0, 3).map((attr: any, index: number) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="text-gray-500">{attr.trait_type}:</span>
                                            <span className="text-gray-800 font-medium">{attr.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center text-sm border-t pt-3">
                                    <span className="text-gray-500">Token #{property.tokenId.toString()}</span>
                                    <span className="text-blue-600 font-medium">View Details</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Demo Info Box */}
            {
                properties.length !== 0 && (
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">🧪 Demo Information</h4>
                        <p className="text-blue-700 text-sm">
                            This is using <strong>mock data</strong> for testing. No real contract is deployed.
                            Switch between Hardhat accounts to see different property ownership states.
                        </p>
                        <div className="mt-2 text-xs text-blue-600">
                            <strong>Connected:</strong> {address}
                        </div>
                    </div>
                )
            }
        </div>
    );
}