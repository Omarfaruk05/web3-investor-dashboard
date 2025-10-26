import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import { ethers } from 'ethers'
import { realEstateTokenConfig } from '@/lib/contract'

export interface Property {
    tokenId: bigint
    location: string
    area: bigint
    value: bigint
    propertyType: string
    yearBuilt: bigint
    currentOwner: string
    isForSale: boolean
    createdAt: bigint
    exists: boolean
}

export const useRealEstateToken = () => {
    const { address, isConnected } = useAccount()
    const { writeContract, data: hash } = useWriteContract()

    // Wait for transaction confirmation
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    // Read: Check if user is owner
    const { data: isOwner }:any = useReadContract({
        ...realEstateTokenConfig,
        functionName: 'owner',
        query: {
            enabled: isConnected,
        },
    })

    // Read: Get all properties
    const { data: allProperties, refetch: refetchProperties } = useReadContract({
        ...realEstateTokenConfig,
        functionName: 'getAllProperties',
    })

    // Read: Get properties by owner
    const { data: ownedProperties } = useReadContract({
        ...realEstateTokenConfig,
        functionName: 'getPropertiesByOwner',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        },
    })

    // Read: Get properties for sale
    const { data: propertiesForSale } = useReadContract({
        ...realEstateTokenConfig,
        functionName: 'getPropertiesForSale',
    })

    // Write: Mint property (only owner)
    const mintProperty = async (
        to: string,
        tokenURI: string,
        location: string,
        area: number,
        value: string,
        propertyType: string,
        yearBuilt: number
    ) => {
        const valueInWei = ethers.parseEther(value)

        writeContract({
            ...realEstateTokenConfig,
            functionName: 'mintProperty',
            args: [to, tokenURI, location, area, valueInWei, propertyType, yearBuilt],
        })
    }

    // Write: Update property value
    const updatePropertyValue = async (tokenId: bigint, newValue: string) => {
        const valueInWei = ethers.parseEther(newValue)

        writeContract({
            ...realEstateTokenConfig,
            functionName: 'updatePropertyValue',
            args: [tokenId, valueInWei],
        })
    }

    // Write: Toggle for sale status
    const toggleForSale = async (tokenId: bigint) => {
        writeContract({
            ...realEstateTokenConfig,
            functionName: 'toggleForSale',
            args: [tokenId],
        })
    }

    // // Read: Get individual property
    // const { data: property, refetch: refetchProperty } = useReadContract({
    //     ...realEstateTokenConfig,
    //     functionName: 'getProperty',
    //     args: [tokenId],
    //     query: {
    //         enabled: false, // We'll manually trigger this
    //     },
    // })

    const getProperty = async (tokenId: bigint) => {
        // You might need to use a different approach for individual property queries
        // or use the readContract hook differently
    }

    return {
        // Account
        address,
        isConnected,
        isOwner: isOwner?.toLowerCase() === address?.toLowerCase(),

        // Properties data
        allProperties: allProperties as Property[] | undefined,
        ownedProperties: ownedProperties as Property[] | undefined,
        propertiesForSale: propertiesForSale as Property[] | undefined,

        // Write functions
        mintProperty,
        updatePropertyValue,
        toggleForSale,

        // Transaction status
        isConfirming,
        isConfirmed,
        hash,

        // Refetch functions
        refetchProperties,
    }
}