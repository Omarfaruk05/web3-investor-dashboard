import RealEstateToken from './RealEstateToken.json';

// export const CONTRACT_ABI = MyTest.abi;
export const CONTRACT_ABI = RealEstateToken.abi;
export const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';


export const realEstateTokenConfig = {
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,

}