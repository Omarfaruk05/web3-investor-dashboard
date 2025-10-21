// types/property.ts
export interface IProperty {
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

export type TPropertyArray = IProperty[];