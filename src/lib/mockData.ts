
export const mockProperties = [
    {
        tokenId: BigInt(0),
        tokenURI: "ipfs://QmTest1",
        owner: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", // Account #0
        metadata: {
            name: "Luxury Villa in Dubai",
            description: "Beautiful 5-bedroom villa with pool and garden",
            image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400",
            attributes: [
                { trait_type: "Location", value: "Dubai" },
                { trait_type: "Bedrooms", value: "5" },
                { trait_type: "Area", value: "3500 sq ft" },
                { trait_type: "Price", value: "$2.5M" }
            ]
        }
    },
    {
        tokenId: BigInt(1),
        tokenURI: "ipfs://QmTest2",
        owner: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", // Account #0
        metadata: {
            name: "Beachfront Apartment",
            description: "Modern 3-bedroom apartment with ocean view",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
            attributes: [
                { trait_type: "Location", value: "Miami" },
                { trait_type: "Bedrooms", value: "3" },
                { trait_type: "Area", value: "1800 sq ft" },
                { trait_type: "Price", value: "$1.2M" }
            ]
        }
    },
    {
        tokenId: BigInt(2),
        tokenURI: "ipfs://QmTest3",
        owner: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Account #1
        metadata: {
            name: "Mountain Cabin",
            description: "Cozy 2-bedroom cabin in the mountains",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
            attributes: [
                { trait_type: "Location", value: "Colorado" },
                { trait_type: "Bedrooms", value: "2" },
                { trait_type: "Area", value: "1200 sq ft" },
                { trait_type: "Price", value: "$450K" }
            ]
        }
    }
];