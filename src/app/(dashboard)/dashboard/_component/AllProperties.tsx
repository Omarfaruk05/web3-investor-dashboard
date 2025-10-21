// components/AllProperties.tsx
'use client';

import { useAllProperties } from '@/hooks/useRealEstateToken';

interface Property {
    tokenId: bigint;
    location: string;
    area: bigint;
    value: bigint;
    propertyType: string;
    yearBuilt: bigint;
    currentOwner: string;
    isForSale: boolean;
    createdAt?: bigint;
}

export function AllProperties() {
    const { properties, isLoading, error, refetch } = useAllProperties();



    if (isLoading) return (
        <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error loading properties: {error.message}</p>
            <button
                onClick={() => refetch()}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Retry
            </button>
        </div>
    );

    if (!properties || properties.length === 0) return (
        <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No properties found</p>
            <p className="text-gray-400">Properties will appear here once they are minted.</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">All Properties</h2>
                <div className="text-sm text-gray-600">
                    Total: {properties?.length} propert{properties?.length === 1 ? 'y' : 'ies'}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(properties as Property[]).map((property, index) => (
                    <PropertyCard key={index} property={property} />
                ))}
            </div>
        </div>
    );
}

function PropertyCard({ property }: { property: Property }) {
    const formatEther = (value: bigint) => {
        return Number(value) / 10 ** 18;
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 truncate">
                        {property.location}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${property.isForSale
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                        {property.isForSale ? 'For Sale' : 'Not for Sale'}
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium capitalize">{property.propertyType}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-medium">{property.area.toString()} sqm</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Value:</span>
                        <span className="font-medium text-blue-600">
                            {formatEther(property.value)} ETH
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Year Built:</span>
                        <span className="font-medium">{property.yearBuilt.toString()}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Owner:</span>
                        <span className="font-medium text-sm">
                            {formatAddress(property.currentOwner)}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Token ID:</span>
                        <span className="font-medium">#{property.tokenId.toString()}</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}