// hooks/useRealEstateToken.ts
import { useReadContract } from 'wagmi'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract'
import { TPropertyArray } from '@/types/property';


export function useAllProperties() {
    const { data: properties, isLoading, error, refetch } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getAllProperties',
    })

    // Cast the data to the correct type
    const typedProperties = properties as TPropertyArray | undefined;

    return {
        properties: typedProperties,
        isLoading,
        error,
        refetch
    }
}

export function usePropertiesForSale() {
    const { data: properties, isLoading, error, refetch } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getPropertiesForSale',
    })

    return { properties, isLoading, error, refetch }
}